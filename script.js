const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const lightbox = document.querySelector('.lightbox');
const lightboxMedia = document.querySelector('.lightbox-media');
const lightboxTitle = document.querySelector('.lightbox-title');

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 35, 220)}ms`;
  observer.observe(element);
});

document.querySelectorAll('.filter-button').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter-button').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    document.querySelectorAll('.portfolio-item').forEach((item) => {
      item.classList.toggle('is-hidden', filter !== 'all' && item.dataset.category !== filter);
    });
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxMedia.style.backgroundImage = '';
}

document.querySelectorAll('[data-lightbox]').forEach((item) => {
  item.addEventListener('click', () => {
    const image = item.dataset.lightbox;
    if (!image) return;
    lightboxMedia.style.backgroundImage = `url('${image}')`;
    lightboxTitle.textContent = item.dataset.title;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeLightbox();
});

document.querySelector('.gallery-trigger').addEventListener('click', () => {
  document.querySelector('[data-filter="all"]').click();
  document.querySelector('.portfolio-grid').scrollIntoView({ behavior: 'smooth', block: 'center' });
});

document.querySelector('.showreel-card').addEventListener('click', () => {
  const status = document.querySelector('.video-copy > p');
  status.textContent = 'Your showreel is ready to connect. Add a YouTube, Vimeo or uploaded video link here.';
});

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const status = form.querySelector('.form-status');
    if (!form.checkValidity()) {
      status.textContent = 'Please complete every field before sending.';
      status.style.color = 'var(--bg)';
      form.reportValidity();
      return;
    }
    status.textContent = 'Thanks. Your message is ready to send when a form service is connected.';
    form.reset();
  });
}

const realMomentsItem = document.querySelector('[data-title="Portraits / Real moments"]');
if (realMomentsItem) realMomentsItem.dataset.lightbox = 'IMG-20260521-WA0080.jpg';
