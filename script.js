const menuToggle = document.querySelector('[data-menu-toggle]');
const menu = document.querySelector('[data-menu]');

if (menuToggle && menu) {
  const closeMenu = () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  };

  menuToggle.addEventListener('click', () => {
    const willOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(willOpen));
    menu.classList.toggle('is-open', willOpen);
    document.body.classList.toggle('menu-open', willOpen);
  });

  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

const header = document.querySelector('[data-header]');
if (header) {
  const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 18);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
}

document.querySelectorAll('[data-store-link]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const note = document.querySelector('[data-launch-note]');
    if (!note) return;
    note.textContent = 'Store links are coming soon — thanks for your interest!';
    note.classList.add('is-visible');
  });
});

const launchUpdateButton = document.querySelector('[data-launch-update]');
const launchUpdateNote = document.querySelector('[data-launch-update-note]');

if (launchUpdateButton && launchUpdateNote) {
  launchUpdateButton.addEventListener('click', () => {
    launchUpdateNote.textContent = 'Launch updates will be available here soon.';
    launchUpdateNote.classList.add('is-visible');
  });
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

    document.querySelectorAll('[data-word]').forEach((word) => word.classList.remove('is-active'));
    button.classList.add('is-active');
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

  revealItems.forEach((item) => observer.observe(item));
}

document.querySelectorAll('[data-year]').forEach((year) => {
  year.textContent = String(new Date().getFullYear());
});
