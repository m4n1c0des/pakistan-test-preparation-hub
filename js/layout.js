/* Shared header/footer injection */
function renderHeader(active) {
  const links = [
    { href: 'index.html', id: 'home', label: 'Home' },
    { href: 'dashboard.html', id: 'dashboard', label: 'Dashboard' },
    { href: 'practice.html', id: 'practice', label: 'Practice' },
    { href: 'mock.html', id: 'mock', label: 'Mock Test' },
    { href: 'bookmarks.html', id: 'bookmarks', label: 'Bookmarks' },
  ];
  return `
  <header class="header">
    <div class="header-inner">
      <a href="index.html" class="logo">📘 <span>Pakistan Test Prep Hub</span></a>
      <nav class="nav">
        ${links.map(l => `<a href="${l.href}" class="${active===l.id?'active':''}"><span class="nav-label">${l.label}</span></a>`).join('')}
        <button class="theme-btn" onclick="toggleTheme()" title="Toggle theme" aria-label="Toggle theme">🌓</button>
      </nav>
    </div>
  </header>`;
}

function renderFooter(count) {
  return `
  <footer class="footer">
    Pakistan Test Preparation Hub · Independent practice resource · Always verify official patterns
    ${count ? ' · ' + count + ' questions' : ''}
  </footer>`;
}

function toggleTheme() {
  const cur = PTH.getTheme();
  const next = cur === 'dark' ? 'light' : cur === 'light' ? 'system' : 'dark';
  PTH.setTheme(next);
}

function mountLayout(active, count) {
  const body = document.body;
  body.insertAdjacentHTML('afterbegin', renderHeader(active));
  body.insertAdjacentHTML('beforeend', renderFooter(count));
}
