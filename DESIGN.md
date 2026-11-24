# Design system

## Context
- Artifact: personal portfolio / bio page
- Audience: people discovering Bearcat and their projects
- Goal: quickly communicate interests, work, and ways to connect
- Positioning: technical, crisp, personal
- Adjectives: precise, curious, understated
- Aesthetic essence: quiet technical index

## Visual direction
- Compact one-page profile, tuned to fit a desktop viewport without scrolling; content remains naturally scrollable on smaller screens.
- Signature move: the numbered project index and compact metadata establish a technical directory feel without turning the page into a dashboard.
- Display and body: Manrope; utility labels: DM Mono.
- Type scale: 1.2 ratio, 12px base; headings scale fluidly.
- Palette: deep blue-charcoal background, raised charcoal surface, cool off-white foreground, muted slate, restrained mint-cyan accent. Colors use OKLCH custom properties in `src/global.css`.
- Spacing base: 4px; radii: square-edged controls and image frame; no drop shadows.
- Layout: narrow editorial column, asymmetric avatar-and-intro row, full-width project index, compact skill strip.
- Motion: short color/transform transitions only; reduced motion is respected.
- Accessibility: semantic landmarks, descriptive labels, visible focus, text-based skills, and keyboard-accessible links.
- Imagery: existing turtle avatar; no stock or generated imagery.

## Slop audit
- Removed the purple gradient, glass card, external status widget, and remotely generated skill-icon strip.
- Uses a cohesive type pair, tokenized OKLCH palette, restrained borders, responsive layout, and no decorative cards or shadow stacks.
- Desktop first-viewport fit is the target; mobile intentionally scrolls as needed to preserve readable content.

## Changelog
- 2026-11-23: Reorganized the bio page into a compact technical portfolio and documented its visual system.
