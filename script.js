// ============================================================
// 96 RANCH — script.js (IMPLEMENTATION_005: Hero Food Carousel)
// ============================================================

// ── Hero Carousel ─────────────────────────────────────────────
const CAROUSEL = {
  slides: [],
  dots: [],
  current: 0,
  total: 0,
  timer: null,
  progressEl: null,
  interval: 6000,        // 6 seconds per slide
  isRunning: false,
  reducedMotion: false,

  init() {
    const container = document.getElementById('heroCarousel');
    if (!container) return;

    // Respect prefers-reduced-motion
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.slides = Array.from(container.querySelectorAll('.hero-slide'));
    this.total = this.slides.length;
    if (this.total === 0) return;

    // Build dots
    this.buildDots();

    // Build progress bar
    this.buildProgress();

    // Pause on hover / focus (desktop)
    container.addEventListener('mouseenter', () => this.pause());
    container.addEventListener('mouseleave', () => this.resume());

    // Keyboard nav
    container.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft')  this.prev();
      if (e.key === 'ArrowRight') this.next();
    });

    // Touch swipe
    this.initSwipe(container);

    // Start — skip animation if user prefers reduced motion
    if (!this.reducedMotion) {
      this.start();
    } else {
      // Just show slide 0, no timer
      this.goTo(0, false);
    }
  },

  buildDots() {
    const dotsContainer = document.querySelector('.hero-dots');
    if (!dotsContainer) return;

    for (let i = 0; i < this.total; i++) {
      const btn = document.createElement('button');
      btn.className = 'hero-dot' + (i === 0 ? ' hero-dot--active' : '');
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-label', `Go to slide ${i + 1} of ${this.total}`);
      btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      btn.dataset.index = i;
      btn.addEventListener('click', () => {
        this.goTo(i);
        this.restart();
      });
      dotsContainer.appendChild(btn);
      this.dots.push(btn);
    }
  },

  buildProgress() {
    const hero = document.querySelector('.hero');
    if (!hero || this.reducedMotion) return;
    const bar = document.createElement('div');
    bar.className = 'hero-progress';
    bar.id = 'heroProgress';
    bar.setAttribute('role', 'progressbar');
    bar.setAttribute('aria-hidden', 'true');
    hero.appendChild(bar);
    this.progressEl = bar;
  },

  goTo(index, animate = true) {
    const prev = this.current;

    // Deactivate current
    if (this.slides[prev]) {
      this.slides[prev].classList.remove('hero-slide--active');
      this.slides[prev].setAttribute('aria-hidden', 'true');
    }
    if (this.dots[prev]) {
      this.dots[prev].classList.remove('hero-dot--active');
      this.dots[prev].setAttribute('aria-selected', 'false');
    }

    // Activate new
    this.current = ((index % this.total) + this.total) % this.total;

    if (this.slides[this.current]) {
      this.slides[this.current].classList.add('hero-slide--active');
      this.slides[this.current].setAttribute('aria-hidden', 'false');

      // Re-trigger Ken Burns by forcing reflow
      if (!this.reducedMotion) {
        const img = this.slides[this.current].querySelector('.hero-slide-img');
        if (img) {
          img.style.animation = 'none';
          void img.offsetWidth; // reflow
          img.style.animation = '';
        }
      }
    }
    if (this.dots[this.current]) {
      this.dots[this.current].classList.add('hero-dot--active');
      this.dots[this.current].setAttribute('aria-selected', 'true');
    }

    // Progress bar reset
    if (this.progressEl) {
      this.progressEl.classList.remove('hero-progress--running');
      void this.progressEl.offsetWidth; // reflow to restart transition
    }
  },

  next() {
    this.goTo(this.current + 1);
  },

  prev() {
    this.goTo(this.current - 1);
  },

  start() {
    if (this.isRunning || this.reducedMotion) return;
    this.isRunning = true;

    // Kick off progress bar immediately
    if (this.progressEl) {
      requestAnimationFrame(() => {
        this.progressEl.classList.add('hero-progress--running');
      });
    }

    this.timer = setInterval(() => {
      this.next();
      // Restart progress bar
      if (this.progressEl) {
        this.progressEl.classList.remove('hero-progress--running');
        void this.progressEl.offsetWidth;
        this.progressEl.classList.add('hero-progress--running');
      }
    }, this.interval);
  },

  pause() {
    if (!this.isRunning) return;
    clearInterval(this.timer);
    this.timer = null;
    this.isRunning = false;
    // Pause progress bar visually
    if (this.progressEl) {
      const computed = getComputedStyle(this.progressEl).width;
      const parentWidth = this.progressEl.parentElement.offsetWidth;
      const pct = (parseFloat(computed) / parentWidth) * 100;
      this.progressEl.classList.remove('hero-progress--running');
      this.progressEl.style.transition = 'none';
      this.progressEl.style.width = pct + '%';
    }
  },

  resume() {
    if (this.isRunning || this.reducedMotion) return;
    // Restart the full interval from the current slide
    this.progressEl && (this.progressEl.style.transition = '');
    this.restart();
  },

  restart() {
    this.pause();
    // Short delay so the goTo transition looks clean
    setTimeout(() => this.start(), 100);
  },

  initSwipe(el) {
    let startX = 0, startY = 0;

    el.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });

    el.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;

      // Only register horizontal swipe if it's clearly horizontal
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        dx < 0 ? this.next() : this.prev();
        this.restart();
      }
    }, { passive: true });
  }
};

// ── Mobile Menu Toggle ────────────────────────────────────────
function toggleMenu(btn) {
  const mobileNav = document.getElementById('navMobile');
  const isExpanded = btn.getAttribute('aria-expanded') === 'true';

  btn.setAttribute('aria-expanded', String(!isExpanded));
  mobileNav.classList.toggle('is-open', !isExpanded);
  mobileNav.setAttribute('aria-hidden', String(isExpanded));
  document.body.style.overflow = isExpanded ? '' : 'hidden';

  const spans = btn.querySelectorAll('span');
  if (!isExpanded) {
    spans[0].style.transform = 'rotate(45deg) translate(5.5px, 5.5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5.5px, -5.5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '1';
    spans[2].style.transform = '';
  }
}

function closeMenu() {
  const btn = document.querySelector('.nav-hamburger');
  const mobileNav = document.getElementById('navMobile');
  if (!mobileNav) return;
  mobileNav.classList.remove('is-open');
  mobileNav.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (btn) {
    btn.setAttribute('aria-expanded', 'false');
    const spans = btn.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '1';
    spans[2].style.transform = '';
  }
}

// ── Netflix Row Scroll ────────────────────────────────────────
function scrollRow(btn, direction) {
  const shell = btn.closest('.scroll-row-shell');
  if (!shell) return;
  const row = shell.querySelector('.scroll-row');
  if (!row) return;
  row.scrollBy({ left: row.clientWidth * 0.8 * direction, behavior: 'smooth' });
}

function updateArrows(row) {
  const shell = row.closest('.scroll-row-shell');
  if (!shell) return;
  const left  = shell.querySelector('.scroll-arrow--left');
  const right = shell.querySelector('.scroll-arrow--right');
  if (left)  left.style.opacity  = row.scrollLeft <= 8 ? '0' : '';
  if (right) right.style.opacity = (row.scrollLeft + row.clientWidth >= row.scrollWidth - 8) ? '0' : '';
}

function initScrollRows() {
  document.querySelectorAll('.scroll-row').forEach(row => {
    updateArrows(row);
    row.addEventListener('scroll', () => updateArrows(row), { passive: true });
  });
}

function initRowKeyboard() {
  document.querySelectorAll('.scroll-row').forEach(row => {
    row.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); row.scrollBy({ left: 300, behavior: 'smooth' }); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); row.scrollBy({ left: -300, behavior: 'smooth' }); }
    });
  });
}

function initDragScroll() {
  document.querySelectorAll('.scroll-row').forEach(row => {
    let isDown = false, startX, scrollStart, moved = false;
    row.addEventListener('mousedown', (e) => { isDown = true; moved = false; row.style.cursor = 'grabbing'; startX = e.pageX - row.offsetLeft; scrollStart = row.scrollLeft; });
    row.addEventListener('mouseleave', () => { isDown = false; row.style.cursor = 'grab'; });
    row.addEventListener('mouseup', () => { isDown = false; setTimeout(() => { row.style.cursor = ''; }, 80); });
    row.addEventListener('mousemove', (e) => { if (!isDown) return; e.preventDefault(); moved = true; row.scrollLeft = scrollStart - (e.pageX - row.offsetLeft - startX) * 1.2; });
    row.addEventListener('click', (e) => { if (moved) e.stopPropagation(); }, true);
    row.style.cursor = 'grab';
  });
}

// ── Nav scroll ───────────────────────────────────────────────
function handleNavScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  nav.classList.toggle('scrolled', window.scrollY > 80);
}

// ── Scroll progress bar ──────────────────────────────────────
function updateScrollProgress() {
  const el = document.getElementById('scroll-progress');
  if (!el) return;
  const total = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  el.style.width = total > 0 ? (window.scrollY / total) * 100 + '%' : '0%';
}

// ── Reveal on scroll ─────────────────────────────────────────
function revealOnScroll() {
  document.querySelectorAll('.reveal').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 80) el.classList.add('active');
  });
}

// ── Sticky mobile CTA ────────────────────────────────────────
function handleStickyCTA() {
  const cta = document.getElementById('stickyCta');
  if (!cta) return;
  const show = window.innerWidth <= 900 && window.scrollY > window.innerHeight * 0.5;
  cta.style.display = show ? 'flex' : 'none';
  cta.setAttribute('aria-hidden', String(!show));
}

// ── Smooth scroll ────────────────────────────────────────────
function smoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const id = this.getAttribute('href').substring(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: window.scrollY + target.getBoundingClientRect().top - 72, behavior: 'smooth' });
      closeMenu();
    });
  });
}

// ── Hero entrance ────────────────────────────────────────────
function heroEntrance() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

  ['.hero-eyebrow', '.hero-title', '.hero-lead', '.hero-actions', '.hero-dots'].forEach((sel, i) => {
    const el = document.querySelector(sel);
    if (!el) return;
    el.style.cssText += `opacity:0;transform:translateY(28px);transition:opacity 0.85s ease ${i * 0.15}s,transform 0.85s ease ${i * 0.15}s`;
    requestAnimationFrame(() => setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 60));
  });
}

// ── Card stagger ─────────────────────────────────────────────
function staggerCards() {
  document.querySelectorAll('.scroll-row > *').forEach((el, i) => {
    el.style.transitionDelay = (i * 0.06) + 's';
    el.classList.add('reveal');
  });
}

// ── Touch feedback ───────────────────────────────────────────
function initTouchFeedback() {
  document.querySelectorAll('.craving-card, .event-card, .category-card').forEach(card => {
    card.addEventListener('touchstart', () => { card.style.transform = 'scale(0.97)'; card.style.transition = 'transform 0.1s'; }, { passive: true });
    card.addEventListener('touchend', () => { card.style.transform = ''; }, { passive: true });
  });
}

// ── Visibility API: pause when tab hidden ────────────────────
function initVisibilityPause() {
  document.addEventListener('visibilitychange', () => {
    document.hidden ? CAROUSEL.pause() : CAROUSEL.resume();
  });
}

// ── Init ─────────────────────────────────────────────────────
function init() {
  // Carousel first — most visible above fold
  CAROUSEL.init();
  initVisibilityPause();

  // Section reveals
  document.querySelectorAll('.section, .trust-bar, .fb-cta-section').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i * 0.04) + 's';
  });

  staggerCards();
  initScrollRows();
  initRowKeyboard();
  initDragScroll();
  initTouchFeedback();

  window.addEventListener('scroll', () => {
    handleNavScroll();
    updateScrollProgress();
    revealOnScroll();
    handleStickyCTA();
  }, { passive: true });

  handleNavScroll();
  updateScrollProgress();
  revealOnScroll();
  handleStickyCTA();
  smoothScroll();

  document.addEventListener('click', (e) => {
    const nav = document.getElementById('navMobile');
    const btn = document.querySelector('.nav-hamburger');
    if (nav && btn && nav.classList.contains('is-open') &&
        !nav.contains(e.target) && !btn.contains(e.target)) closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  heroEntrance();
  console.log('%c🍽️  96 RANCH — Carousel active. 20 dishes in rotation.', 'color:#f4a261;font-family:monospace;font-size:13px;');
}

document.addEventListener('DOMContentLoaded', init);
