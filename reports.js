// Trip reports — remembers the chosen language and runs the photo lightbox.
// Without JS the selector is still plain links and each photo opens on its own.

document.querySelectorAll('[data-lang-choice]').forEach((link) => {
  link.addEventListener('click', () => {
    try {
      localStorage.setItem('ocmtReportsLang', link.dataset.langChoice);
    } catch (err) { /* storage blocked: the link still works */ }
  });
});

const lightbox = document.getElementById('lightbox');
const lightboxLinks = Array.from(document.querySelectorAll('[data-lightbox]'));

if (lightbox && lightboxLinks.length && typeof lightbox.showModal === 'function') {
  const image = lightbox.querySelector('.lightbox__img');
  const caption = lightbox.querySelector('.lightbox__caption');
  let current = 0;

  function show(index) {
    current = (index + lightboxLinks.length) % lightboxLinks.length;
    const link = lightboxLinks[current];
    image.src = link.href;
    image.alt = link.querySelector('img').alt;
    caption.textContent = link.dataset.caption;
  }

  lightboxLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      show(index);
      lightbox.showModal();
    });
  });

  const hasSeveral = lightboxLinks.length > 1;
  lightbox.querySelector('[data-lightbox-prev]').hidden = !hasSeveral;
  lightbox.querySelector('[data-lightbox-next]').hidden = !hasSeveral;

  lightbox.querySelector('[data-lightbox-close]').addEventListener('click', () => lightbox.close());
  lightbox.querySelector('[data-lightbox-prev]').addEventListener('click', () => show(current - 1));
  lightbox.querySelector('[data-lightbox-next]').addEventListener('click', () => show(current + 1));

  lightbox.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });

  // A click on the dark area around the photo closes it
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.close();
  });
}
