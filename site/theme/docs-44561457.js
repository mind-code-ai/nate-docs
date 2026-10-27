(() => {
  const root = new URL(path_to_root || './', location.href);
  const el = (tag, text = '', cls = '') => Object.assign(document.createElement(tag), {textContent: text, className: cls});
  const link = (text, path, cls) => Object.assign(el('a', text, cls), {href: new URL(path, root)});
  const main = document.querySelector('main');
  const home = /\/(?:index\.html|introduction\.html)?$/.test(location.pathname);
  document.body.dataset.page = home ? 'home' : 'chapter';
  const title = document.querySelector('.menu-title');
  const brand = link('Nate', 'index.html', 'nate-brand');
  const logo = Object.assign(el('img'), {src: new URL('favicon.svg', root), alt: ''});
  brand.prepend(logo); brand.append(el('span', 'Documentation'));
  const container = el('div', '', 'menu-title'); container.append(brand); title.replaceWith(container);
  const controls = document.querySelector('.left-buttons');
  document.querySelector('.menu-bar').setAttribute('role', 'banner');
  const oldToggle = document.querySelector('#mdbook-sidebar-toggle');
  const sidebarToggle = el('button', '', 'icon-button'); sidebarToggle.type = 'button';
  sidebarToggle.id = oldToggle.id;
  for (const name of ['aria-label', 'aria-controls', 'aria-expanded', 'title']) sidebarToggle.setAttribute(name, oldToggle.getAttribute(name));
  sidebarToggle.append(...oldToggle.childNodes); oldToggle.replaceWith(sidebarToggle);
  sidebarToggle.onclick = () => {
    document.querySelector('#mdbook-sidebar').style.display = '';
    document.querySelector('#mdbook-sidebar-toggle-anchor').click();
    sidebarToggle.setAttribute('aria-expanded', oldToggle.getAttribute('aria-expanded'));
  };
  document.querySelector('#mdbook-sidebar').addEventListener('click', event => {
    if (innerWidth <= 620 && event.target.closest('a')) sidebarToggle.click();
  });
  const version = document.querySelector('meta[name="nate-version"]').content;
  controls.prepend(link(version, 'specs/1.0-scope.html', 'version-link'));
  const search = el('button', '', 'header-search'); search.type = 'button';
  search.setAttribute('aria-label', 'Search docs ⌘ K');
  search.setAttribute('aria-keyshortcuts', 'Control+k Meta+k');
  search.append(el('span', 'Search docs', 'search-label'), el('kbd', '⌘ K')); controls.prepend(search);
  search.querySelector('kbd').setAttribute('aria-hidden', 'true');
  const toggle = document.querySelector('#mdbook-search-toggle');
  const wrapper = document.querySelector('#mdbook-search-wrapper');
  const input = document.querySelector('#mdbook-searchbar');
  wrapper.setAttribute('role', 'dialog'); wrapper.setAttribute('aria-modal', 'true');
  wrapper.setAttribute('aria-label', 'Search documentation'); input.setAttribute('aria-label', 'Search documentation');
  input.setAttribute('aria-describedby', 'mdbook-searchresults-header');
  input.addEventListener('input', () => input.dispatchEvent(new KeyboardEvent('keyup', {bubbles: true})));
  const backdrop = el('div', '', 'search-backdrop'); backdrop.hidden = true; document.body.append(backdrop);
  const open = () => !wrapper.classList.contains('hidden');
  const close = () => { if (open()) toggle.click(); };
  const closeButton = el('button', '×', 'search-close'); closeButton.type = 'button';
  closeButton.setAttribute('aria-label', 'Close search'); closeButton.onclick = close; wrapper.prepend(closeButton);
  search.onclick = () => { if (!open()) toggle.click(); input.focus(); };
  backdrop.onclick = close;
  new MutationObserver(() => { backdrop.hidden = !open(); if (!open()) search.focus(); }).observe(wrapper, {attributes: true, attributeFilter: ['class']});
  document.addEventListener('keydown', event => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault(); if (open()) close(); else search.click();
    }
    if (event.key === 'Escape') close();
    if (event.key === 'Tab' && open()) {
      const nodes = [...wrapper.querySelectorAll('input, button, a[href]')].filter(n => n.getClientRects().length);
      const first = nodes[0], last = nodes.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  document.querySelectorAll('#mdbook-theme-list button').forEach(button => {
    if (button.id.endsWith('coal')) button.textContent = 'Dark';
    else if (button.id.endsWith('default_theme')) button.textContent = 'System';
    else if (!button.id.endsWith('light')) button.parentElement.remove();
  });
  document.querySelectorAll('.clip-button').forEach(button => button.setAttribute('aria-label', 'Copy code'));
  document.querySelectorAll('pre code').forEach(code => { code.tabIndex = 0; });
  if (window.hljs) {
    hljs.registerLanguage('nate', h => ({keywords: {keyword: 'func return if else for in while break continue const struct enum match interface impl import as spawn concurrent channel send receive guard on error panic defer requires ensures', literal: 'true false nil', built_in: 'print len append assert sandbox is_error'}, contains: [h.HASH_COMMENT_MODE, h.QUOTE_STRING_MODE, h.APOS_STRING_MODE, h.C_NUMBER_MODE]}));
    document.querySelectorAll('code.language-nate').forEach(code => { code.textContent = code.textContent; code.removeAttribute('data-highlighted'); hljs.highlightBlock(code); });
  }
  if (home) return;
  const heading = main.querySelector('h1');
  const group = location.pathname.split('/').at(-2).replaceAll('-', ' ');
  const crumb = el('nav', '', 'breadcrumb'); crumb.setAttribute('aria-label', 'Breadcrumb');
  crumb.append(link('Docs', 'index.html'), el('span', '/'), el('span', group)); main.prepend(crumb);
  const tools = el('div', '', 'page-tools');
  const copy = el('button', 'Copy page'); copy.type = 'button';
  const status = el('span', '', 'sr-only'); status.setAttribute('role', 'status');
  const route = location.pathname.slice(root.pathname.length);
  const markdown = `markdown/${route === 'specs/index.html' ? 'specs/README.md' : route.replace(/\.html$/, '.md')}`;
  tools.append(copy, link('View Markdown ↗', markdown), el('span', `${Math.max(1, Math.ceil(main.textContent.split(/\s+/).length / 220))} min read`, 'reading-time'), status); heading?.after(tools);
  copy.onclick = async () => {
    try {
      const response = await fetch(new URL(markdown, root)); if (!response.ok) throw new Error();
      await navigator.clipboard.writeText(await response.text()); copy.textContent = 'Copied'; status.textContent = 'Page copied as Markdown';
      setTimeout(() => { copy.textContent = 'Copy page'; }, 2000);
    } catch { status.textContent = 'Copy unavailable. Use View Markdown instead.'; }
  };
  main.querySelectorAll('table').forEach((table, index) => {
    const rows = [...table.querySelectorAll('tbody tr')]; if (rows.length < 8) return;
    const filter = el('div', '', 'api-filter');
    const label = el('label', 'Filter this reference', 'sr-only');
    const field = Object.assign(el('input'), {id: `reference-filter-${index}`, type: 'search', placeholder: 'Filter names, signatures, or descriptions…'}); label.htmlFor = field.id;
    const count = el('span', `${rows.length} entries`, 'api-count'); count.setAttribute('role', 'status');
    filter.append(label, field, count); table.before(filter);
    field.oninput = () => {
      rows.forEach(row => { row.hidden = !row.textContent.toLowerCase().includes(field.value.toLowerCase()); });
      count.textContent = `${rows.filter(row => !row.hidden).length} of ${rows.length} entries`;
    };
  });
  const headings = [...main.querySelectorAll('h2[id], h3[id]')];
  if (headings.length) {
    const toc = el('nav', '', 'page-toc'); toc.setAttribute('aria-label', 'On this page'); toc.append(el('p', 'On this page'));
    headings.forEach(h => { const a = el('a', h.textContent, h.tagName === 'H3' ? 'sub' : ''); a.href = `#${h.id}`; toc.append(a); }); document.body.append(toc);
    const observer = new IntersectionObserver(entries => {
      const visible = entries.find(entry => entry.isIntersecting); if (!visible) return;
      toc.querySelectorAll('a').forEach(a => a.classList.toggle('current', a.hash === `#${visible.target.id}`));
    }, {rootMargin: '-80px 0px -65% 0px'}); headings.forEach(h => observer.observe(h));
  }
  customElements.whenDefined('mdbook-sidebar-scrollbox').then(() => {
    const chapters = [...document.querySelectorAll('.sidebar a[href]')];
    const current = chapters.findIndex(a => a.classList.contains('active')); if (current < 0) return;
    const footer = el('nav', '', 'chapter-footer'); footer.setAttribute('aria-label', 'Chapter navigation');
    [[current - 1, '← Previous'], [current + 1, 'Next →']].forEach(([index, text]) => {
      if (!chapters[index]) return; const a = el('a'); a.href = chapters[index].href;
      a.append(el('small', text), el('span', chapters[index].textContent.trim())); footer.append(a);
    }); main.append(footer);
  });
})();
