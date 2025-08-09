// Pre-compile regex for better performance
const LUCIDE_IMPORT_PATTERN = /([ \t]*)import\s+\{\s*([^}]+)\s*\}\s+from\s+['"]lucide-astro['"]/g;

/**
 * Creates a Vite/Astro plugin that optimizes lucide-astro imports by converting
 * destructured imports to direct imports for better tree-shaking
 *
 * @returns An Astro plugin that transforms lucide-astro imports
 */
function createLucideAstroImportOptimizer() {
  return {
    name: 'lucide-astro-optimizer',
    transform(sourceCode, filePath) {
      if (!isValidInput(sourceCode, filePath)) return null;

      try {
        if (!sourceCode.includes('lucide-astro')) return null;

        const { transformedCode, hasChanges } = transformLucideImports(sourceCode);

        if (hasChanges) {
          return {
            code: transformedCode,
            map: null,
          };
        }

        return null;
      } catch (error) {
        handleTransformError(error);
        return null;
      }
    },
  };
}

function isValidInput(code, id) {
  return Boolean(code && id);
}

function transformLucideImports(sourceCode) {
  let hasChanges = false;

  const transformedCode = sourceCode.replace(
    LUCIDE_IMPORT_PATTERN,
    (match, indentation, importNames) => {
      if (!importNames.trim()) return match;

      const semicolonAtEnd = match.endsWith(';');
      const individualImports = convertToIndividualImports(
        importNames,
        indentation,
        semicolonAtEnd
      );

      if (individualImports) {
        hasChanges = true;
        return individualImports;
      }

      return match;
    }
  );

  return { transformedCode, hasChanges };
}

function convertToIndividualImports(importNames, indentation, withSemicolon) {
  return importNames
    .split(',')
    .map(name => name.trim())
    .filter(Boolean)
    .map(name => {
      const kebabCasePath = convertToKebabCase(name);
      const semicolon = withSemicolon ? ';' : '';
      return `${indentation}import ${name} from 'lucide-astro/${kebabCasePath}'${semicolon}`;
    })
    .join('\n');
}

function convertToKebabCase(str) {
  return str.replace(/-/g, '');
}

function handleTransformError(error) {
  const typedError = error instanceof Error ? error : new Error(String(error));
  console.error('Error in lucide-astro-optimizer plugin:', typedError);
}

export default createLucideAstroImportOptimizer;
