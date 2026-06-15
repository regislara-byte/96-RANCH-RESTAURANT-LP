// ============================================================
// 96 RANCH — script.js  (IMPLEMENTATION_003: Netflix Rows)
// ============================================================

// Mobile Menu Toggle
function toggleMenu(btn) {
  const mobileNav = document.getElementById('navMobile');
  const isExpanded = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!isExpanded));
  mobileNav.classList.toggle('is-open', !isExpanded);
  mobileNav.setAttribute('aria-hidden', String(isExpanded));
  const spans = btn.querySelectorAll('span');
  if (!isExpanded) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
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
  if (btn) {
    btn.setAttribute('aria-expanded', 'false');
    const spans = btn.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '1';
    spans[2].style.transform = '';
  }
}

// ── Netflix-style Arrow Scroll ──────────────────────────────
// Called inline via onclick="scrollRow(this, 1)" / scrollRow(this, -1)
function scrollRow(btn, direction) {
  // Navigate up to the shell, then find the .scroll-row sibling
  const shell = btn.closest('.scroll-row-shell');
  if (!shell) return;
  const row = shell.querySelector('.scroll-row');
  if (!row) return;

  // Scroll by ~80% of the visible row width so you always see a peek
  const amount = row.clientWidth * 0.8 * direction;
  row.scrollBy({ left: amount, behavior: 'smooth' });
}

// ── Arrow visibility based on scroll position ───────────────
function updateArrows(row) {
  const shell = row.closest('.scroll-row-shell');
  if (!shell) return;
  const leftArrow  = shell.querySelector('.scroll-arrow--left');
  const rightArrow = shell.querySelector('.scroll-arrow--right');
  const atStart = row.scrollLeft <= 8;
  const atEnd   = row.scrollLeft + row.clientWidth >= row.scrollWidth - 8;

  if (leftArrow)  leftArrow.style.opacity  = atStart ? '0' : '';
  if (rightArrow) rightArrow.style.opacity = atEnd   ? '0' : '';
}

function initScrollRows() {
  document.querySelectorAll('.scroll-row').forEach(row => {
    // Initial arrow state
    updateArrows(row);
    // Update on scroll
    row.addEventListener('scroll', () => updateArrows(row), { passive: true });
  });
}

// ── Keyboard navigation for scroll rows ─────────────────────
function initRowKeyboard() {
  document.querySelectorAll('.scroll-row').forEach(row => {
    row.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        row.scrollBy({ left: 320, behavior: 'smooth' });
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        row.scrollBy({ left: -320, behavior: 'smooth' });
      }
    });
  });
}

// ── Drag-to-scroll on desktop ────────────────────────────────
function initDragScroll() {
  document.querySelectorAll('.scroll-row').forEach(row => {
    let isDown = false, startX, scrollStart;

    row.addEventListener('mousedown', (e) => {
      isDown = true;
      row.style.cursor = 'grabbing';
      startX = e.pageX - row.offsetLeft;
      scrollStart = row.scrollLeft;
    });

    row.addEventListener('mouseleave', () => {
      isDown = false;
      row.style.cursor = '';
    });

    row.addEventListener('mouseup', () => {
      isDown = false;
      row.style.cursor = 'grab';
      // Reset after a tick so click events on cards still fire
      setTimeout(() => { row.style.cursor = ''; }, 100);
    });

    row.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x    = e.pageX - row.offsetLeft;
      const walk = (x - startX) * 1.2;
      row.scrollLeft = scrollStart - walk;
    });

    // Grab cursor hint
    row.style.cursor = 'grab';

    // Prevent card clicks from firing after a drag
    row.addEventListener('click', (e) => {
      const wasDragging = Math.abs(row.scrollLeft - scrollStart) > 5;
      if (wasDragging) e.stopPropagation();
    }, true);
  });
}

// ── Navbar Scroll Effect ─────────────────────────────────────
function handleNavScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  nav.classList.toggle('scrolled', window.scrollY > 80);
}

// ── Scroll Progress Bar ──────────────────────────────────────
function updateScrollProgress() {
  const el = document.getElementById('scroll-progress');
  if (!el) return;
  const total = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  el.style.width = total > 0 ? (window.scrollY / total) * 100 + '%' : '0%';
}

// ── Reveal on Scroll ─────────────────────────────────────────
function revealOnScroll() {
  document.querySelectorAll('.reveal').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add('active');
    }
  });
}

// ── Sticky Mobile CTA ────────────────────────────────────────
function handleStickyCTA() {
  const cta = document.getElementById('stickyCta');
  if (!cta) return;
  const show = window.innerWidth <= 768 && window.scrollY > 600;
  cta.style.display = show ? 'flex' : 'none';
  cta.setAttribute('aria-hidden', String(!show));
}

// ── Smooth Scroll for Anchor Links ───────────────────────────
function smoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const id = this.getAttribute('href').substring(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      window.scrollTo({
        top: window.scrollY + target.getBoundingClientRect().top - 84,
        behavior: 'smooth'
      });
      closeMenu();
    });
  });
}

// ── Card stagger for scroll rows ─────────────────────────────
function staggerRowCards() {
  document.querySelectorAll('.scroll-row > *').forEach((el, i) => {
    el.style.transitionDelay = (i * 0.06) + 's';
    el.classList.add('reveal');
  });
}

// ── Hero entrance ────────────────────────────────────────────
function heroEntrance() {
  ['.hero-eyebrow', '.hero-title', '.hero-lead', '.hero-actions'].forEach((sel, i) => {
    const el = document.querySelector(sel);
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(32px)';
    el.style.transition = `opacity 0.9s ease ${i * 0.18}s, transform 0.9s ease ${i * 0.18}s`;
    requestAnimationFrame(() => setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 80));
  });
}

// ── Init ─────────────────────────────────────────────────────
function init() {
  // Section reveals
  document.querySelectorAll('.section, .trust-bar, .fb-cta-section').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i * 0.04) + 's';
  });

  staggerRowCards();
  initScrollRows();
  initRowKeyboard();
  initDragScroll();

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

  // Click outside closes mobile menu
  document.addEventListener('click', (e) => {
    const nav = document.getElementById('navMobile');
    const btn = document.querySelector('.nav-hamburger');
    if (nav && btn && !nav.contains(e.target) && !btn.contains(e.target)) closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  heroEntrance();

  console.log('%c🍽️  96 RANCH — Netflix Row mode active', 'color:#f4a261;font-size:14px;font-family:monospace;');
}

document.addEventListener('DOMContentLoaded', init);
