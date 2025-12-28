(function () {
  // Smooth scroll for in-page links
  const smoothLinks = document.querySelectorAll('a[data-scroll]');
  smoothLinks.forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href') || '';
      if (!href.startsWith('#')) return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // close mobile nav if open
      closeNav();
    });
  });

  // Mobile nav
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');

  function openNav() {
    if (!nav || !navToggle) return;
    nav.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
  }
  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      if (expanded) closeNav();
      else openNav();
    });

    // Close nav when clicking outside
    document.addEventListener('click', (e) => {
      const t = e.target;
      if (!t) return;
      const clickedInside = nav.contains(t) || navToggle.contains(t);
      if (!clickedInside) closeNav();
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeNav();
    });
  }

  // Contact form: validate and open mailto with prefilled details
  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('formStatus');

  function setStatus(msg) {
    if (statusEl) statusEl.textContent = msg || '';
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      setStatus('');

      const fd = new FormData(form);
      const name = String(fd.get('name') || '').trim();
      const business = String(fd.get('business') || '').trim();
      const email = String(fd.get('email') || '').trim();
      const message = String(fd.get('message') || '').trim();

      if (!name || !business || !email || !message) {
        setStatus('Please fill out all fields.');
        return;
      }
      if (!isValidEmail(email)) {
        setStatus('Please enter a valid email address.');
        return;
      }

      const subject = encodeURIComponent('LocalPulse — Get Started');
      const body = encodeURIComponent(
        `Name: ${name}\nBusiness: ${business}\nEmail: ${email}\n\nMessage:\n${message}\n\n—\nSent from localpulse.com`
      );

      // Opens user's email client (simple + reliable for a static site)
      window.location.href = `mailto:contact@localpulse.com?subject=${subject}&body=${body}`;
      setStatus('Opening your email client…');
      form.reset();
    });
  }
})();
