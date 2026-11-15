const root = document.documentElement;
const themeButton = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
if (themeButton) {
  themeButton.hidden = false;
  const updateThemeLabel = () => {
    const dark = root.dataset.theme === 'dark' || (!root.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches);
    themeButton.setAttribute('aria-label', dark ? '切换到浅色主题' : '切换到深色主题');
  };
  updateThemeLabel();
  themeButton.addEventListener('click', () => {
    const dark = root.dataset.theme === 'dark' || (!root.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches);
    root.dataset.theme = dark ? 'light' : 'dark';
    try { localStorage.setItem('hx-theme', root.dataset.theme); } catch (_) {}
    updateThemeLabel();
  });
}

const search = document.querySelector<HTMLInputElement>('[data-article-search]');
const cards = [...document.querySelectorAll<HTMLElement>('[data-post-card]')];
const filters = [...document.querySelectorAll<HTMLButtonElement>('[data-filter]')];
const empty = document.querySelector<HTMLElement>('[data-empty-search]');
const status = document.querySelector<HTMLElement>('[data-search-status]');
let category = 'all';
function updateArticles() {
  const query = search?.value.trim().toLocaleLowerCase() ?? '';
  let count = 0;
  cards.forEach((card) => {
    const matches = (category === 'all' || card.dataset.category === category) && (card.dataset.search ?? '').includes(query);
    card.hidden = !matches;
    if (matches) count++;
  });
  filters.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
  if (empty) empty.hidden = count > 0;
  if (status) status.textContent = query || category !== 'all' ? `找到 ${count} 篇匹配记录` : `共 ${count} 篇记录`;
}
search?.addEventListener('input', updateArticles);
filters.forEach((button) => button.addEventListener('click', () => {
  category = button.dataset.filter ?? 'all';
  updateArticles();
}));
document.querySelector('[data-reset-search]')?.addEventListener('click', () => {
  category = 'all';
  if (search) search.value = '';
  updateArticles();
  search?.focus();
});
