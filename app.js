/* ============================================================
   MADATOURS CORPORATE — app.js
   All site interactivity: navbar, forms, counters, animations
   ============================================================ */

'use strict';

/* ══ 1. NAVBAR SCROLL ════════════════════════════════════════ */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ══ 2. HAMBURGER MENU ═══════════════════════════════════════ */
(function initHamburger() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = btn.classList.toggle('open');
    menu.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      btn.classList.remove('open');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  menu.querySelectorAll('.mob-link, .mob-cta').forEach(link => {
    link.addEventListener('click', () => {
      btn.classList.remove('open');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

/* ══ 3. HERO TAB SWITCHER (index page) ══════════════════════ */
function switchHeroTab(tab) {
  document.querySelectorAll('.f-tab').forEach(t =>
    t.classList.toggle('active', t.dataset.tab === tab));
  document.querySelectorAll('.f-panel').forEach(p =>
    p.classList.toggle('active', p.id === 'panel-' + tab));
}

/* ══ 4. TRIP TYPE (hero & vol page) ═════════════════════════ */
function setTripType(btn, type) {
  btn.closest('.trip-type').querySelectorAll('.tt-btn').forEach(b =>
    b.classList.remove('active'));
  btn.classList.add('active');
  const ret = document.getElementById('returnDateGroup');
  if (ret) ret.style.display = type === 'AS' ? 'none' : '';
}

function setFlightType(type) {
  ['ttAR','ttAS','ttMC'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  });
  const map = { AR:'ttAR', AS:'ttAS', MC:'ttMC' };
  const el = document.getElementById(map[type]);
  if (el) el.classList.add('active');

  const ret = document.getElementById('retDateGroup');
  if (ret) {
    const disable = type === 'AS' || type === 'MC';
    ret.style.opacity       = disable ? '0.4' : '1';
    ret.style.pointerEvents = disable ? 'none' : '';
  }
}

/* ══ 5. CLASS TABS ═══════════════════════════════════════════ */
function setClass(btn) {
  btn.closest('.class-tabs').querySelectorAll('.c-tab').forEach(t =>
    t.classList.remove('active'));
  btn.classList.add('active');
}

/* ══ 6. COUNTERS ════════════════════════════════════════════ */
function counter(id, delta) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = Math.max(1, Math.min(20, parseInt(el.textContent) + delta));
}

function counterDk(id, delta) {
  counter(id, delta);
}

/* ══ 7. ROUTE SWAP (vol page) ═══════════════════════════════ */
function swapRoutes() {
  const orig = document.getElementById('origin');
  const dest = document.getElementById('dest');
  if (!orig || !dest) return;
  [orig.value, dest.value] = [dest.value, orig.value];
  const btn = document.querySelector('.swap-btn');
  if (btn) {
    btn.style.transform = 'rotate(180deg)';
    setTimeout(() => { btn.style.transform = ''; }, 300);
  }
}

/* ══ 8. RANGE SLIDERS ═══════════════════════════════════════ */
function updatePrice(val) {
  const el = document.getElementById('priceVal');
  if (el) el.textContent = Number(val).toLocaleString('fr-FR') + ' MGA';
}

function updateFlightBudget(val) {
  const el = document.getElementById('flightBudgetVal');
  if (el) el.textContent = Number(val).toLocaleString('fr-FR') + ' €';
}

/* ══ 9. ADVANCED TOGGLES ════════════════════════════════════ */
function toggleAdv() {
  const toggle = document.getElementById('advToggle');
  const opts   = document.getElementById('advOpts');
  if (!toggle || !opts) return;
  const open = toggle.classList.toggle('open');
  opts.classList.toggle('open', open);
}

function toggleFlightAdv() {
  const toggle = document.getElementById('flightAdvToggle');
  const opts   = document.getElementById('flightAdvOpts');
  if (!toggle || !opts) return;
  const open = toggle.classList.toggle('open');
  opts.classList.toggle('open', open);
}

/* ══ 10. FORM RESETS ════════════════════════════════════════ */
function resetHotelForm() {
  document.querySelectorAll('.bk-body input, .bk-body select, .bk-body textarea')
    .forEach(el => {
      if (el.type === 'checkbox' || el.type === 'radio') el.checked = false;
      else el.value = '';
    });
  const priceVal = document.getElementById('priceVal');
  if (priceVal) priceVal.textContent = '300 000 MGA';
  const range = document.getElementById('priceRange');
  if (range) range.value = 300000;
}

function resetFlightForm() {
  ['origin','dest','depDate','retDate'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  const bv = document.getElementById('flightBudgetVal');
  if (bv) bv.textContent = '5 000 €';
  document.querySelectorAll('#paxAdult').forEach(el => { el.textContent = '1'; });
}

/* ══ 11. LOADING HELPER ═════════════════════════════════════ */
function setLoading(btn, label, cb, delay) {
  const original = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML =
    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="2.5" style="animation:spin .7s linear infinite">
      <polyline points="23 4 23 10 17 10"/>
      <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/>
    </svg> ${label}`;
  setTimeout(() => {
    btn.disabled   = false;
    btn.innerHTML  = original;
    if (cb) cb();
  }, delay || 1800);
}

/* ══ 12. SEARCH ACTIONS ═════════════════════════════════════ */
function searchHotels(btn) {
  setLoading(btn, 'Recherche en cours…', () => {
    showToast('Résultats actualisés — ' + (Math.floor(Math.random() * 6) + 7) + ' hôtels trouvés !');
    const resHd = document.querySelector('.res-hd');
    if (resHd) resHd.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

function searchFlights(btn) {
  setLoading(btn, 'Recherche des vols…', () => {
    showToast('Vols disponibles ! Un conseiller vous contacte sous 30 min.');
  });
}

function bookHotel(name) {
  showToast('Demande envoyée — ' + name + ' — Confirmation sous 2h !');
}

function bookFlight(orig, dest) {
  const o = document.getElementById('origin');
  const d = document.getElementById('dest');
  if (o) o.value = orig + ' — ';
  if (d) d.value = dest + ' — ';
  const bk = document.querySelector('.bk-sec');
  if (bk) bk.scrollIntoView({ behavior: 'smooth' });
}

/* ══ 13. TOAST ══════════════════════════════════════════════ */
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  // Update text node
  const nodes = toast.childNodes;
  for (let i = nodes.length - 1; i >= 0; i--) {
    if (nodes[i].nodeType === 3) { nodes[i].textContent = ' ' + msg; break; }
  }
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 4800);
}

/* ══ 14. CONTACT FORM ═══════════════════════════════════════ */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  // Live char counter
  const msg   = document.getElementById('message');
  const count = document.getElementById('charCount');
  if (msg && count) {
    msg.addEventListener('input', () => {
      const len = msg.value.length;
      count.textContent = len;
      count.style.color = len > 900 ? 'var(--error)' : 'var(--g400)';
    });
  }

  // Blur-time validation
  form.querySelectorAll('[required]').forEach(field => {
    field.addEventListener('blur',  () => validateField(field));
    field.addEventListener('input', () => {
      if (field.classList.contains('invalid')) validateField(field);
    });
  });
})();

function validateField(field) {
  const errEl = document.getElementById('err-' + field.id);
  let error   = '';

  if (field.type === 'checkbox') {
    if (!field.checked) error = 'Veuillez accepter la politique de confidentialité.';
  } else if (!field.value.trim()) {
    error = 'Ce champ est requis.';
  } else if (field.type === 'email') {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value))
      error = 'Adresse email invalide (ex : nom@domaine.mg).';
  } else if (field.id === 'message' && field.value.trim().length < 20) {
    error = 'Message trop court — minimum 20 caractères.';
  }

  if (errEl) {
    errEl.textContent    = error;
    errEl.style.display  = error ? 'block' : 'none';
  }
  field.style.borderColor = error ? 'var(--error)' : '';
  field.style.boxShadow   = error ? '0 0 0 3px rgba(196,43,43,.12)' : '';
  field.classList.toggle('invalid', !!error);
  return !error;
}

function submitContact(e) {
  e.preventDefault();
  const form   = e.target;
  const btn    = document.getElementById('submitBtn');
  const fields = form.querySelectorAll('[required]');
  let valid    = true;

  fields.forEach(f => { if (!validateField(f)) valid = false; });

  if (!valid) {
    const first = form.querySelector('.invalid');
    if (first) first.focus();
    return;
  }

  setLoading(btn, 'Envoi en cours…', () => {
    showToast('Message envoyé ! Notre équipe vous répond sous 2 heures ouvrées.');
    form.reset();
    const cnt = document.getElementById('charCount');
    if (cnt) cnt.textContent = '0';
    form.querySelectorAll('[required]').forEach(f => {
      f.style.borderColor = '';
      f.style.boxShadow   = '';
      f.classList.remove('invalid');
    });
  });
}

/* ══ 15. FAQ ACCORDION ══════════════════════════════════════ */
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const icon   = btn.querySelector('svg');
  const isOpen = answer.style.maxHeight && answer.style.maxHeight !== '0px';

  // Close all open items
  document.querySelectorAll('.faq-a').forEach(a => { a.style.maxHeight = '0px'; });
  document.querySelectorAll('.faq-q svg').forEach(i => { i.style.transform = ''; });

  if (!isOpen) {
    answer.style.maxHeight = (answer.scrollHeight + 40) + 'px';
    if (icon) icon.style.transform = 'rotate(180deg)';
  }
}

/* ══ 16. STATS COUNTER ANIMATION ════════════════════════════ */
function animateCounter(id, target, duration) {
  const el = document.getElementById(id);
  if (!el) return;
  const start = performance.now();
  (function step(now) {
    const p    = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(ease * target);
    if (p < 1) requestAnimationFrame(step);
  })(start);
}

/* ══ 17. INTERSECTION OBSERVERS ════════════════════════════ */
(function initObservers() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Scroll-reveal */
  const reveals = document.querySelectorAll('.reveal, .reveal-l, .reveal-r');
  if (reduced) {
    reveals.forEach(el => el.classList.add('vis'));
  } else {
    const ro = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('vis'); ro.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => ro.observe(el));
  }

  /* Stats counters */
  const band = document.querySelector('.stats-band');
  if (band) {
    let fired = false;
    const so = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !fired) {
        fired = true;
        animateCounter('s1', 500, 1800);
        animateCounter('s2', 15,  1400);
        animateCounter('s3', 98,  1600);
        so.disconnect();
      }
    }, { threshold: 0.35 });
    so.observe(band);
  }
})();

/* ══ 18. DEFAULT DATES ══════════════════════════════════════ */
(function setDefaultDates() {
  const fmt = d => d.toISOString().split('T')[0];
  const today    = new Date();
  const tom      = new Date(today); tom.setDate(tom.getDate() + 1);
  const week     = new Date(today); week.setDate(week.getDate() + 7);
  const twoWeeks = new Date(today); twoWeeks.setDate(twoWeeks.getDate() + 14);

  const ci = document.getElementById('checkin');
  const co = document.getElementById('checkout');
  if (ci) { ci.value = fmt(tom);  ci.min = fmt(today); }
  if (co) { co.value = fmt(week); co.min = fmt(tom); }

  const dd = document.getElementById('depDate');
  const rd = document.getElementById('retDate');
  if (dd) { dd.value = fmt(week);     dd.min = fmt(today); }
  if (rd) { rd.value = fmt(twoWeeks); rd.min = fmt(week); }

  if (ci && co) {
    ci.addEventListener('change', () => {
      const nMin = new Date(ci.value); nMin.setDate(nMin.getDate() + 1);
      co.min = fmt(nMin);
      if (new Date(co.value) <= new Date(ci.value)) co.value = fmt(nMin);
    });
  }
  if (dd && rd) {
    dd.addEventListener('change', () => {
      const nMin = new Date(dd.value); nMin.setDate(nMin.getDate() + 1);
      rd.min = fmt(nMin);
      if (new Date(rd.value) <= new Date(dd.value)) rd.value = fmt(nMin);
    });
  }
})();

/* ══ 19. SMOOTH ANCHOR SCROLL ═══════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 72 + 16;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    }
  });
});

/* ══ 20. KEYBOARD: ESC ══════════════════════════════════════ */
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (btn && btn.classList.contains('open')) {
    btn.classList.remove('open');
    menu && menu.classList.remove('open');
    document.body.style.overflow = '';
    btn.focus();
  }
  const toast = document.getElementById('toast');
  if (toast && toast.classList.contains('show')) toast.classList.remove('show');
});

/* ══ 21. INJECT SPIN KEYFRAMES ══════════════════════════════ */
if (!document.getElementById('mt-spin')) {
  const s = document.createElement('style');
  s.id = 'mt-spin';
  s.textContent = '@keyframes spin{to{transform:rotate(360deg)}}';
  document.head.appendChild(s);
}
