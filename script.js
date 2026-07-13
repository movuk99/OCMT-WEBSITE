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

// Hero slideshow — crossfades every 5s. Skips auto-advance entirely for
// people who prefer reduced motion (they just see the first photo).
const slideshow = document.getElementById('heroSlideshow');
if (slideshow && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const slides = slideshow.querySelectorAll('.hero__slide');
  let current = 0;
  let timer = setInterval(nextSlide, 5000);

  function nextSlide() {
    slides[current].classList.remove('is-active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('is-active');
  }

  // Pause while the tab is in the background — no point burning cycles
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearInterval(timer);
    } else {
      timer = setInterval(nextSlide, 5000);
    }
  });
}
