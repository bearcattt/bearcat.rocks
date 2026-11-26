const DISCORD_USER_ID = '997203884428767282';
const LANYARD_URL = `https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`;
const AVATAR_CACHE_KEY = 'avatar-cache';
const AVATAR_CACHE_PREFIX = `https://cdn.discordapp.com/avatars/${DISCORD_USER_ID}/`;
const AVATAR_REFRESH_INTERVAL = 5 * 60 * 1000;

type LanyardResponse = {
  success: boolean;
  data?: {
    discord_user?: {
      id?: string;
      avatar?: string | null;
    };
  };
};

const avatar = document.querySelector<HTMLImageElement>('#discord-avatar');

function readCachedAvatar(): string | null {
  try {
    const url = localStorage.getItem(AVATAR_CACHE_KEY);
    return url?.startsWith(AVATAR_CACHE_PREFIX) ? url : null;
  } catch {
    return null;
  }
}

function cacheAvatar(url: string): void {
  try {
    localStorage.setItem(AVATAR_CACHE_KEY, url);
  } catch {
    // The avatar can still load when browser storage is unavailable.
  }
}

async function refreshAvatar(): Promise<void> {
  if (!avatar) return;

  try {
    const response = await fetch(LANYARD_URL, { cache: 'no-store' });
    if (!response.ok) return;

    const result = (await response.json()) as LanyardResponse;
    const user = result.data?.discord_user;
    if (!result.success || user?.id !== DISCORD_USER_ID || !user.avatar) return;

    const extension = user.avatar.startsWith('a_') ? 'gif' : 'webp';
    const url = `${AVATAR_CACHE_PREFIX}${user.avatar}.${extension}?size=256`;

    if (avatar.src !== url) avatar.src = url;
    cacheAvatar(url);
  } catch {}
}

function setupTabs(): void {
  const tabs = Array.from(document.querySelectorAll<HTMLButtonElement>('.tab-button'));
  const panels = Array.from(document.querySelectorAll<HTMLElement>('[role="tabpanel"]'));
  if (!tabs.length || !panels.length) return;

  function activateTab(tab: HTMLButtonElement): void {
    const selectedPanelId = tab.getAttribute('aria-controls');

    tabs.forEach(item => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.classList.toggle('active-tab', selected);
    });

    panels.forEach(panel => {
      const selected = panel.id === selectedPanelId;
      panel.classList.toggle('hidden', !selected);
      panel.classList.toggle('flex', selected);
      panel.setAttribute('aria-hidden', String(!selected));

      if (selected) {
        panel.classList.remove('panel-enter');
        requestAnimationFrame(() => panel.classList.add('panel-enter'));
      }
    });
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateTab(tab));
    tab.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;

      event.preventDefault();
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      const nextIndex = (index + direction + tabs.length) % tabs.length;
      const nextTab = tabs[nextIndex];

      nextTab.focus();
      activateTab(nextTab);
    });
  });
}

if (avatar) {
  const cachedAvatar = readCachedAvatar();
  if (cachedAvatar) avatar.src = cachedAvatar;

  void refreshAvatar();
  window.setInterval(() => void refreshAvatar(), AVATAR_REFRESH_INTERVAL);
}

setupTabs();
