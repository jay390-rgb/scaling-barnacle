/* =====================================================
   LOADER
   ===================================================== */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('is-hidden'), 400);
});

/* =====================================================
   THEME TOGGLE (dark / light) with persistence
   ===================================================== */
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

function applyTheme(theme){
  if (theme === 'light') {
    root.setAttribute('data-theme', 'light');
    themeToggle.setAttribute('aria-pressed', 'true');
    themeToggle.setAttribute('aria-label', 'Switch to dark theme');
  } else {
    root.removeAttribute('data-theme');
    themeToggle.setAttribute('aria-pressed', 'false');
    themeToggle.setAttribute('aria-label', 'Switch to light theme');
  }
}

const savedTheme = localStorage.getItem('theme') ||
  (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  const next = current === 'light' ? 'dark' : 'light';
  applyTheme(next);
  localStorage.setItem('theme', next);
});

/* =====================================================
   NAVBAR: scroll state + mobile toggle
   ===================================================== */
const siteHeader = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  siteHeader.classList.toggle('is-scrolled', window.scrollY > 12);
});

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('is-open');
  navToggle.classList.toggle('is-open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* =====================================================
   SCROLL REVEAL
   ===================================================== */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

/* =====================================================
   SKILL BARS animate on scroll
   ===================================================== */
const skillBars = document.querySelectorAll('.skill-bar');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
skillBars.forEach(el => skillObserver.observe(el));

/* =====================================================
   LEDGER COUNTERS (hero stats)
   ===================================================== */
const ledgerNums = document.querySelectorAll('.ledger-num');
const ledgerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      ledgerObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
ledgerNums.forEach(el => ledgerObserver.observe(el));

function animateCount(el){
  const target = parseInt(el.dataset.count, 10);
  const duration = 1200;
  const start = performance.now();
  function tick(now){
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  }
  requestAnimationFrame(tick);
}

/* =====================================================
   PROJECT FILTERING
   ===================================================== */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => {
      b.classList.remove('is-active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('is-active');
    btn.setAttribute('aria-selected', 'true');

    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !match);
    });
  });
});

/* =====================================================
   CONTACT FORM (client-side handling, no backend)
   ===================================================== */
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!contactForm.checkValidity()) {
    formStatus.textContent = 'Please fill in all required fields correctly.';
    formStatus.style.color = 'var(--warning)';
    return;
  }
  formStatus.textContent = 'Thanks! Your message has been received — I\'ll reply within 1–2 business days.';
  formStatus.style.color = 'var(--success)';
  contactForm.reset();
});

/* =====================================================
   NEWSLETTER FORM
   ===================================================== */
const newsletterForm = document.getElementById('newsletterForm');
const newsletterStatus = document.getElementById('newsletterStatus');

newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!newsletterForm.checkValidity()) {
    newsletterStatus.textContent = 'Please enter a valid email address.';
    newsletterStatus.style.color = 'var(--warning)';
    return;
  }
  newsletterStatus.textContent = 'Subscribed! Thanks for joining.';
  newsletterStatus.style.color = 'var(--success)';
  newsletterForm.reset();
});

/* =====================================================
   SCROLL TO TOP
   ===================================================== */
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('is-visible', window.scrollY > 480);
});
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
