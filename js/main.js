/**
 * desha.at — main.js
 * Navigation · Scroll-Animationen · Mobile Menu · Intersection Observer
 */

'use strict';

/* ============================================================
   1. NAVIGATION — Scrolled State
   ============================================================ */
(function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const SCROLL_THRESHOLD = 60;

  function updateNav() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav(); // Beim Laden prüfen
})();


/* ============================================================
   2. AKTIVER NAV-LINK
   ============================================================ */
(function initActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav__link, .nav__mobile-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    // Exakter Match oder beginnt mit dem Pfad (für Unterseiten)
    if (
      href === currentPath ||
      (href !== '/' && currentPath.startsWith(href))
    ) {
      link.classList.add('is-active');
    }
  });
})();


/* ============================================================
   3. MOBILE MENU
   ============================================================ */
(function initMobileMenu() {
  const toggle = document.querySelector('.nav__toggle');
  const mobileMenu = document.querySelector('.nav__mobile');
  const mobileLinks = document.querySelectorAll('.nav__mobile-link');

  if (!toggle || !mobileMenu) return;

  function openMenu() {
    toggle.classList.add('is-open');
    mobileMenu.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    toggle.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    toggle.classList.remove('is-open');
    mobileMenu.classList.remove('is-open');
    document.body.style.overflow = '';
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', () => {
    const isOpen = toggle.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  });

  // Links schließen das Menü
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // ESC-Taste
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && toggle.classList.contains('is-open')) {
      closeMenu();
      toggle.focus();
    }
  });
})();


/* ============================================================
   4. SCROLL-ANIMATIONEN (Intersection Observer)
   ============================================================ */
(function initScrollAnimations() {
  // Kein reduced-motion: Klassen direkt sichtbar setzen
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.fade-in').forEach(el => {
      el.classList.add('is-visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Nur einmal animieren
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });
})();


/* ============================================================
   5. SMOOTH SCROLL für Anker-Links
   ============================================================ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const navHeight = document.querySelector('.nav')?.offsetHeight ?? 80;
      const targetY = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;

      window.scrollTo({ top: targetY, behavior: 'smooth' });
    });
  });
})();


/* ============================================================
   6. AKTUELLE SEKTION HIGHLIGHTEN (für einseitige Seiten)
   ============================================================ */
(function initSectionHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link[href^="#"]');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle(
              'is-active',
              link.getAttribute('href') === `#${id}`
            );
          });
        }
      });
    },
    {
      rootMargin: '-30% 0px -60% 0px'
    }
  );

  sections.forEach(section => observer.observe(section));
})();


/* ============================================================
   7. KONTAKTFORMULAR — Basis-Validierung & Feedback
   ============================================================ */
(function initContactForm() {
  const form = document.querySelector('.js-contact-form');
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn?.textContent;

  form.addEventListener('submit', async function (e) {
    // Formspree übernimmt die eigentliche Übermittlung
    // Hier nur: Loading-State und Feedback

    if (!form.action || form.action.includes('DEIN-FORMSPREE-ID')) {
      e.preventDefault();
      showMessage(form, 'Formular noch nicht konfiguriert. Bitte Formspree-ID einsetzen.', 'error');
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Wird gesendet…';
    }
  });

  // Nach Formspree-Redirect: Erfolgsmeldung zeigen
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('success') === 'true') {
    showMessage(form, 'Vielen Dank! Ich melde mich bald bei dir.', 'success');
    form.reset();
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  }
})();

function showMessage(form, message, type) {
  // Bestehende Meldung entfernen
  form.querySelector('.form__message')?.remove();

  const el = document.createElement('p');
  el.className = `form__message form__message--${type}`;
  el.textContent = message;
  el.style.cssText = type === 'success'
    ? 'color: #4a7c59; background: rgba(74,124,89,0.08); padding: 1rem 1.25rem; border-radius: 8px; margin-top: 0.75rem; font-size: 0.95rem;'
    : 'color: #b5483a; background: rgba(181,72,58,0.08); padding: 1rem 1.25rem; border-radius: 8px; margin-top: 0.75rem; font-size: 0.95rem;';
  form.appendChild(el);
}


/* ============================================================
   8. NEWSLETTER FORMULAR
   ============================================================ */
(function initNewsletterForm() {
  const form = document.querySelector('.js-newsletter-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    const emailInput = form.querySelector('input[type="email"]');
    if (!emailInput?.value) {
      e.preventDefault();
      emailInput?.focus();
    }
  });
})();


/* ============================================================
   9. LAZY LOADING für Bilder
   ============================================================ */
(function initLazyImages() {
  if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading unterstützt
    document.querySelectorAll('img[data-src]').forEach(img => {
      img.src = img.dataset.src;
      img.loading = 'lazy';
    });
    return;
  }

  // Fallback: IntersectionObserver
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
})();
