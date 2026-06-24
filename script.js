// Mobile Menu Toggle
function toggleMenu(btn) {
  const mobileNav = document.getElementById('navMobile');
  const isExpanded = btn.getAttribute('aria-expanded') === 'true';
  
  btn.setAttribute('aria-expanded', !isExpanded);
  mobileNav.style.display = isExpanded ? 'none' : 'flex';
  mobileNav.setAttribute('aria-hidden', isExpanded);
  
  // Toggle hamburger lines
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
  
  if (btn) {
    btn.setAttribute('aria-expanded', 'false');
    const spans = btn.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '1';
    spans[2].style.transform = '';
  }
  
  mobileNav.style.display = 'none';
  mobileNav.setAttribute('aria-hidden', 'true');
}

// Navbar Scroll Effect
function handleNavScroll() {
  const nav = document.getElementById('nav');
  if (window.scrollY > 80) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}

// Scroll Progress Bar
function updateScrollProgress() {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById('scroll-progress').style.width = scrolled + '%';
}

// Reveal on Scroll
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  
  reveals.forEach(reveal => {
    const windowHeight = window.innerHeight;
    const elementTop = reveal.getBoundingClientRect().top;
    const elementVisible = 120;
    
    if (elementTop < windowHeight - elementVisible) {
      reveal.classList.add('active');
    }
  });
}

// Sticky Mobile CTA
function handleStickyCTA() {
  const stickyCta = document.getElementById('stickyCta');
  if (!stickyCta) return;
  
  if (window.innerWidth <= 768 && window.scrollY > 600) {
    stickyCta.style.display = 'flex';
  } else {
    stickyCta.style.display = 'none';
  }
}

// Smooth Scroll for Anchor Links
function smoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').substring(1);
      if (!targetId) return;
      
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        e.preventDefault();
        const navHeight = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - navHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        closeMenu();
      }
    });
  });
}

// ============================================================
// BOSSA MODE — Audio Identity Layer (Implementation 008)
// ============================================================

function getBossaBtns() {
  return document.querySelectorAll('[id^="bossaBtn"]');
}

function setBossaActive(active) {
  document.body.classList.toggle('bossa-mode', active);
  getBossaBtns().forEach(btn => {
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', active);
  });
}

function toggleBossa() {
  const audio = document.getElementById('bossaAudio');
  if (!audio) return;

  const isActive = document.body.classList.contains('bossa-mode');

  if (!isActive) {
    // Activate
    setBossaActive(true);
    audio.play().catch(() => {
      // Autoplay blocked — still show state
    });
    localStorage.setItem('ranch_bossa_mode', '1');
  } else {
    // Deactivate
    setBossaActive(false);
    audio.pause();
    audio.currentTime = 0;
    localStorage.removeItem('ranch_bossa_mode');
  }
}

function restoreBossaState() {
  // Restore visual state only — never autoplay
  if (localStorage.getItem('ranch_bossa_mode') === '1') {
    setBossaActive(true);
    // Audio NOT started — user must click again per browser rules
  }
}

// Initialize everything
function init() {
  // Add reveal classes to key sections
  const sections = document.querySelectorAll('.section, .trust-bar, .fb-cta-section');
  sections.forEach((section, index) => {
    section.classList.add('reveal');
    // Stagger the animations slightly
    section.style.transitionDelay = (index * 0.05) + 's';
  });
  
  // Event listeners
  window.addEventListener('scroll', () => {
    handleNavScroll();
    updateScrollProgress();
    revealOnScroll();
    handleStickyCTA();
  });
  
  // Initial calls
  handleNavScroll();
  updateScrollProgress();
  revealOnScroll();
  handleStickyCTA();
  
  // Smooth scroll
  smoothScroll();

  // Restore Bossa Mode visual state (no autoplay)
  restoreBossaState();
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    const mobileNav = document.getElementById('navMobile');
    const hamburger = document.querySelector('.nav-hamburger');
    
    if (mobileNav && hamburger && 
        !mobileNav.contains(e.target) && 
        !hamburger.contains(e.target)) {
      closeMenu();
    }
  });
  
  // Keyboard escape support for menu
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });
  
  // Fake hero image load animation
  const heroImg = document.getElementById('heroImg');
  if (heroImg) {
    heroImg.addEventListener('load', () => {
      heroImg.style.opacity = '1';
    });
  }
  
  console.log('%c96 RANCH — Website initialized successfully 🍽️', 'color: #f4a261; font-family: monospace;');
}

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', init);
// ============================================================
// BRAND RITUAL HERO EXPERIENCE — Implementation 010
// Stage 1: Single droplet appears
// Stage 2: Droplets gather, identity forms
// Stage 3: Logo completes — breathe
// Stage 4: Tagline full-screen moment
// Stage 5: Hero content reveals
// Stage 6: Logo becomes permanent floating brand seal
// Total runtime: ~11s. Apple pacing. Bossa rhythm.
// ============================================================

(function () {

  // ── Cluster zones — 400×560 goo viewBox ──────────────────────────────
  // Mapped to real logo regions: handle(top), board(center), spoon(left), fork(right)
  var CLUSTERS = {
    handle: { cx: 200, cy:  62, r: 38,  count:  8 },
    board:  { cx: 200, cy: 308, r: 100, count: 20 },
    spoon:  { cx:  70, cy: 245, r:  48, count: 12 },
    fork:   { cx: 334, cy: 292, r:  44, count:  8 }
  };

  var droplets = [];
  var ritualTl = null;
  var sealTl   = null;
  var done     = false;

  function rand(a, b) { return a + Math.random() * (b - a); }

  // ── Stage 1: single seed droplet, then rest appear ───────────────────
  function createDroplets() {
    var layer = document.getElementById('gooLayer');
    if (!layer) return;

    // Seed droplet — center stage, appears first (S1)
    var seed = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    seed.setAttribute('cx', '200'); seed.setAttribute('cy', '280');
    seed.setAttribute('r',  '8');   seed.setAttribute('fill', '#0c0c0c');
    seed.setAttribute('opacity', '0');
    seed.setAttribute('data-seed', 'true');
    layer.appendChild(seed);
    droplets.push({ el: seed, c: CLUSTERS.board, r: 8, seed: true });

    // Remaining droplets
    Object.keys(CLUSTERS).forEach(function (key) {
      var c = CLUSTERS[key];
      for (var i = 0; i < c.count; i++) {
        var el = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        el.setAttribute('cx',      rand(20, 380));
        el.setAttribute('cy',      rand(20, 540));
        el.setAttribute('r',       rand(4, 11));
        el.setAttribute('fill',    '#0c0c0c');
        el.setAttribute('opacity', '0');
        layer.appendChild(el);
        droplets.push({ el: el, c: c, r: parseFloat(el.getAttribute('r')), seed: false });
      }
    });
  }

  function buildRitual() {
    if (typeof gsap === 'undefined') { skipRitual(); return; }

    ritualTl = gsap.timeline({ onComplete: onRitualComplete });

    // ── Stage 1 (0–1.0s): single droplet appears, pause ─────────────────
    ritualTl.to(droplets[0].el, {
      attr: { opacity: 1, r: 10 },
      duration: 0.6,
      ease: 'power2.out'
    }, 0);

    // Brief pause — let the single drop land
    // (GSAP timeline gap: next event at t=1.6)

    // ── Stage 2 (1.6–4.0s): remaining droplets emerge and gather ────────
    droplets.slice(1).forEach(function (d, i) {
      // Staggered appearance
      ritualTl.to(d.el, {
        attr: { opacity: 1 },
        duration: rand(0.18, 0.32),
        ease: 'power1.out'
      }, rand(1.6, 2.6));

      // Gather toward cluster centroid
      var angle = Math.random() * Math.PI * 2;
      var dist  = rand(4, d.c.r * 0.55);
      ritualTl.to(d.el, {
        attr: {
          cx: d.c.cx + Math.cos(angle) * dist,
          cy: d.c.cy + Math.sin(angle) * dist
        },
        duration: rand(1.4, 2.0),
        ease: 'sine.inOut'
      }, rand(2.0, 2.8));
    });

    // Seed droplet also gathers to board center
    ritualTl.to(droplets[0].el, {
      attr: { cx: 200, cy: 308, r: 12 },
      duration: 1.8,
      ease: 'sine.inOut'
    }, 1.8);

    // ── Stage 2b (4.0–5.2s): liquid mass consolidates ────────────────────
    droplets.forEach(function (d) {
      ritualTl.to(d.el, {
        attr: {
          cx: d.c.cx + rand(-3, 3),
          cy: d.c.cy + rand(-3, 3),
          r:  d.r * rand(2.8, 4.2)
        },
        duration: 1.2,
        ease: 'power3.inOut'
      }, rand(4.0, 4.3));
    });

    // ── Stage 3 (5.2–6.6s): logo reveals — breathe ───────────────────────
    ritualTl.to('#gooWrap', {
      opacity: 0,
      duration: 1.0,
      ease: 'power2.inOut'
    }, 5.2);

    ritualTl.fromTo('#logoImgWrap', {
      opacity: 0,
      scale: 0.9
    }, {
      opacity: 1,
      scale: 1,
      duration: 1.0,
      ease: 'power2.out'
    }, 5.2);

    // Logo breathes — pause — let the brand land (1.2s hold)

    // ── Stage 4 (7.4–9.6s): tagline full-screen moment ───────────────────
    // Logo fades slightly to make room for text
    ritualTl.to('#logoImgWrap', {
      opacity: 0.15,
      scale: 0.82,
      duration: 0.8,
      ease: 'power2.inOut'
    }, 7.2);

    ritualTl.to('#ritualTagline', {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out'
    }, 7.4);

    ritualTl.to('#ritualLine1', {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out'
    }, 7.6);

    ritualTl.to('#ritualLine2', {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out'
    }, 8.1);

    // Hold the tagline (reads at ~8.8s, hold until 9.6s)

    // Tagline fades out
    ritualTl.to('#ritualTagline', {
      opacity: 0,
      duration: 0.7,
      ease: 'power2.in'
    }, 9.4);

    // ── Stage 5 (9.8–11.2s): hero content reveals ────────────────────────
    ritualTl.to('#heroContent', {
      opacity: 1,
      duration: 1.4,
      ease: 'power2.out',
      onStart: function () {
        var hc = document.getElementById('heroContent');
        if (hc) hc.style.pointerEvents = 'auto';
      }
    }, 9.8);

    // ritual-stage logo fades out (brand seal takes over)
    ritualTl.to('#logoImgWrap', {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut'
    }, 10.0);

    // ── Stage 6 (10.4s): brand seal fades in as permanent fixture ────────
    ritualTl.to('#brandSeal', {
      opacity: 1,
      duration: 1.0,
      ease: 'power2.out',
      onComplete: function () {
        var seal = document.getElementById('brandSeal');
        if (seal) seal.classList.add('floating');
        startSealFloat();
      }
    }, 10.4);
  }

  function onRitualComplete() {
    if (done) return;
    done = true;

    var overlay = document.getElementById('ritualOverlay');
    if (overlay) overlay.classList.add('done');
  }

  function startSealFloat() {
    if (typeof gsap === 'undefined') return;
    var seal = document.getElementById('brandSeal');
    if (!seal) return;

    if (sealTl) sealTl.kill();

    // 2–5px drift. Bossa rhythm. No bounce. No pulse.
    sealTl = gsap.timeline({ repeat: -1, yoyo: true });
    sealTl.to(seal, {
      y: -4,           // 4px max drift
      duration: 4.8,   // very slow — bossa tempo
      ease: 'sine.inOut'
    });
  }

  function skipRitual() {
    if (done) return;
    if (ritualTl) { ritualTl.kill(); ritualTl = null; }

    if (typeof gsap !== 'undefined') {
      gsap.set('#gooWrap',        { opacity: 0 });
      gsap.set('#logoImgWrap',    { opacity: 0 });
      gsap.set('#ritualTagline',  { opacity: 0 });
      gsap.set('#heroContent',    { opacity: 1 });
      gsap.set('#brandSeal',      { opacity: 1 });
    } else {
      var hc = document.getElementById('heroContent');
      var bs = document.getElementById('brandSeal');
      if (hc) { hc.style.opacity = '1'; hc.style.pointerEvents = 'auto'; }
      if (bs) bs.style.opacity = '1';
    }

    var hc = document.getElementById('heroContent');
    if (hc) { hc.style.opacity = '1'; hc.style.pointerEvents = 'auto'; }

    done = true;
    var overlay = document.getElementById('ritualOverlay');
    if (overlay) overlay.classList.add('done');

    var seal = document.getElementById('brandSeal');
    if (seal) { seal.classList.add('floating'); startSealFloat(); }
  }

  function initRitual() {
    // Set initial states for tagline lines (slide up on reveal)
    if (typeof gsap !== 'undefined') {
      gsap.set('#ritualLine1', { opacity: 0, y: 18 });
      gsap.set('#ritualLine2', { opacity: 0, y: 18 });
    }

    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var overlay = document.getElementById('ritualOverlay');
      if (overlay) overlay.style.display = 'none';
      var hc = document.getElementById('heroContent');
      if (hc) { hc.style.opacity = '1'; hc.style.pointerEvents = 'auto'; }
      var seal = document.getElementById('brandSeal');
      if (seal) seal.style.opacity = '1';
      return;
    }

    createDroplets();

    if (typeof gsap !== 'undefined') {
      buildRitual();
    } else {
      var waited = 0;
      var poll = setInterval(function () {
        waited += 100;
        if (typeof gsap !== 'undefined') {
          clearInterval(poll);
          buildRitual();
        } else if (waited >= 3000) {
          clearInterval(poll);
          skipRitual();
        }
      }, 100);
    }

    var skipBtn = document.getElementById('ritualSkip');
    if (skipBtn) skipBtn.addEventListener('click', skipRitual);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRitual);
  } else {
    initRitual();
  }

})();
