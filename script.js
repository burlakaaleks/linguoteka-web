document.documentElement.classList.add('js');

const menuToggle = document.querySelector('[data-menu-toggle]');
const menu = document.querySelector('[data-menu]');

if (menuToggle && menu) {
  const desktop = window.matchMedia('(min-width: 820px)');
  const label = menuToggle.querySelector('.sr-only');
  const setMenuOpen = (open) => {
    menuToggle.setAttribute('aria-expanded', String(open));
    if (label) label.textContent = open ? 'Close navigation' : 'Open navigation';
    menu.classList.toggle('is-open', open);
  };
  const closeMenu = () => setMenuOpen(false);

  menuToggle.addEventListener('click', () => {
    setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
  });
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuToggle.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (!menu.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
  });
  menu.addEventListener('focusout', (event) => {
    if (!menu.contains(event.relatedTarget) && event.relatedTarget !== menuToggle) closeMenu();
  });
  desktop.addEventListener('change', closeMenu);
}

const header = document.querySelector('[data-header]');
if (header) {
  const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 18);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
}

const wordMeanings = {
  morning: ['mañana', 'morning · A1'],
  house: ['casa', 'house · A1'],
};

const translation = document.querySelector('[data-sample-translation]');
document.querySelectorAll('[data-word]').forEach((button) => {
  button.addEventListener('click', () => {
    const meaning = wordMeanings[button.dataset.word];
    if (!translation || !meaning) return;

    document.querySelectorAll('[data-word]').forEach((word) => {
      word.classList.remove('is-active');
      word.setAttribute('aria-pressed', 'false');
    });
    button.classList.add('is-active');
    button.setAttribute('aria-pressed', 'true');
    translation.innerHTML = `<span>${meaning[0]}</span><strong>${meaning[1]}</strong>`;
    translation.classList.add('is-active');
  });
});

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('[data-reveal]');

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 },
  );

  revealItems.forEach((item) => {
    item.classList.add('reveal-ready');
    observer.observe(item);
  });
}

document.querySelectorAll('[data-year]').forEach((year) => {
  year.textContent = String(new Date().getFullYear());
});
