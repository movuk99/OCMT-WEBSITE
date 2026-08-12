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

// Scroll reveal — fade + rise once per element as it enters the viewport.
// Elements opt in with [data-reveal]; stagger within a shared grid/list is
// handled purely in CSS via nth-child delays, so this stays simple.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealEls = document.querySelectorAll('[data-reveal]');
if (revealEls.length) {
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-revealed'));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  }
}

// Light parallax on band photography only — [data-parallax] opts in.
// Throttled with rAF, skipped entirely for reduced motion.
const parallaxEls = document.querySelectorAll('[data-parallax]');
if (parallaxEls.length && !reduceMotion) {
  let parallaxTicking = false;
  function updateParallax() {
    const vh = window.innerHeight;
    parallaxEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < vh) {
        const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
        const offset = progress * -36;
        el.style.transform = `translateY(${offset}px) scale(1.08)`;
      }
    });
    parallaxTicking = false;
  }
  window.addEventListener(
    'scroll',
    () => {
      if (!parallaxTicking) {
        requestAnimationFrame(updateParallax);
        parallaxTicking = true;
      }
    },
    { passive: true }
  );
  updateParallax();
}

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
