// Menú móvil — accesible por teclado, sin dependencias externas
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

function closeMenu() {
  navMenu.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Abrir menú');
}

function openMenu() {
  navMenu.classList.add('is-open');
  navToggle.setAttribute('aria-expanded', 'true');
  navToggle.setAttribute('aria-label', 'Cerrar menú');
}

navToggle.addEventListener('click', () => {
  const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
  isOpen ? closeMenu() : openMenu();
});

// Cerrar al elegir un link (útil en móvil, donde el menú es pantalla completa)
navMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

// Cerrar con Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});
