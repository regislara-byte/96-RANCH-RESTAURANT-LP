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
// LIQUID IDENTITY MOTION SYSTEM — Implementation 009
// 8-state sequence. Potrace-traced 96. Apple pacing. Bossa rhythm.
// ============================================================

(function () {

  // ── Cluster zones — real logo geometry, 500×708 viewBox ────────────────
  var CLUSTERS = {
    handle: { cx: 249, cy:  72, r: 44, count: 10 },
    board:  { cx: 249, cy: 388, r: 108, count: 20 },
    spoon:  { cx:  90, cy: 278, r:  52, count: 14 },
    fork:   { cx: 388, cy: 368, r:  48, count: 12 }
  };

  var droplets = [];
  var introTl  = null;
  var idleTl   = null;
  var done     = false;

  function rand(a, b) { return a + Math.random() * (b - a); }

  // ── State 1: inject droplet circles into gooLayer ──────────────────────
  function createDroplets() {
    var layer = document.getElementById('gooLayer');
    if (!layer) return;

    Object.keys(CLUSTERS).forEach(function (key) {
      var c = CLUSTERS[key];
      for (var i = 0; i < c.count; i++) {
        var el = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        el.setAttribute('cx',   rand(20, 480));
        el.setAttribute('cy',   rand(20, 688));
        el.setAttribute('r',    rand(4, 11));
        el.setAttribute('fill', '#0f0f0f');
        el.setAttribute('opacity', '0');
        layer.appendChild(el);
        droplets.push({ el: el, key: key, c: c, r: parseFloat(el.getAttribute('r')) });
      }
    });
  }

  function buildTimeline() {
    if (typeof gsap === 'undefined') { completeIntro(); return; }

    introTl = gsap.timeline({ onComplete: onIntroComplete });

    // ── S1 (0–1.2s): black droplets appear, scattered ───────────────────
    droplets.forEach(function (d) {
      introTl.to(d.el, {
        attr: { opacity: 1 },
        duration: rand(0.25, 0.45),
        ease: 'back.out(1.6)'
      }, rand(0, 1.0));
    });

    // ── S2 (1.2–3.2s): droplets gather toward cluster zones ─────────────
    droplets.forEach(function (d) {
      var angle = Math.random() * Math.PI * 2;
      var dist  = rand(6, d.c.r * 0.65);
      introTl.to(d.el, {
        attr: {
          cx: d.c.cx + Math.cos(angle) * dist,
          cy: d.c.cy + Math.sin(angle) * dist
        },
        duration: 2.0,
        ease: 'sine.inOut'
      }, 1.2);
    });

    // ── S3 (3.2–4.8s): liquid mass forms — radii expand, goo merges ─────
    droplets.forEach(function (d) {
      introTl.to(d.el, {
        attr: {
          cx: d.c.cx + rand(-5, 5),
          cy: d.c.cy + rand(-5, 5),
          r:  d.r * rand(2.4, 3.6)
        },
        duration: 1.6,
        ease: 'power3.inOut'
      }, 3.2);
    });

    // ── S4 (4.8–5.8s): cutting board structure appears ───────────────────
    // goo cross-dissolves into logo SVG
    introTl.to('#gooWrap', {
      opacity: 0,
      duration: 1.0,
      ease: 'power2.inOut'
    }, 4.8);

    introTl.to('#logoSvgWrap', {
      opacity: 1,
      duration: 1.0,
      ease: 'power2.out'
    }, 4.8);

    // ── S5 (5.8–6.7s): original traced 96 typography appears ─────────────
    // logoType96Group is a <g> — use CSS opacity, not attr
    introTl.to('#logoType96Group', {
      opacity: 1,
      duration: 0.75,
      ease: 'power3.out'
    }, 5.8);

    // ── S6 (6.3–7.1s): RANCH appears ────────────────────────────────────
    introTl.to('#logoTypeRanch', {
      attr: { opacity: 1 },
      duration: 0.65,
      ease: 'power3.out'
    }, 6.3);

    // ── S7 (7.1–8.2s): food hero image fades in behind logo ─────────────
    introTl.to('#liquidStage', {
      y: -32,
      scale: 0.82,
      duration: 1.1,
      ease: 'power2.inOut'
    }, 7.1);

    introTl.to('#heroContent', {
      opacity: 1,
      duration: 1.1,
      ease: 'power2.out',
      onStart: function () {
        var hc = document.getElementById('heroContent');
        if (hc) hc.style.pointerEvents = 'auto';
      }
    }, 7.4);

    // ── S8 (8.2s+): logo transitions to floating mode ────────────────────
    // handled in onIntroComplete → startIdleFloat()
  }

  function onIntroComplete() {
    if (done) return;
    done = true;

    var intro = document.getElementById('liquidIntro');
    if (intro) intro.classList.add('done');

    var wrap = document.getElementById('logoSvgWrap');
    if (wrap) wrap.classList.add('floating');

    // Transfer logo into hero section as persistent floating element
    var stage = document.getElementById('liquidStage');
    if (stage) {
      stage.classList.add('idle-stage');
    }

    startIdleFloat();
  }

  function startIdleFloat() {
    if (typeof gsap === 'undefined') return;
    var stage = document.getElementById('liquidStage');
    if (!stage) return;

    // Kill any lingering intro tl
    if (idleTl) idleTl.kill();

    // Gentle perpetual breath — Apple/luxury pacing
    idleTl = gsap.timeline({ repeat: -1, yoyo: true });
    idleTl.to(stage, {
      y: '-=12',
      scale: 1.018,
      duration: 3.6,
      ease: 'sine.inOut'
    });
  }

  function completeIntro() {
    if (done) return;
    if (introTl) { introTl.kill(); introTl = null; }

    // Snap everything to final settled state
    if (typeof gsap !== 'undefined') {
      gsap.set('#gooWrap',          { opacity: 0 });
      gsap.set('#logoSvgWrap',      { opacity: 1 });
      gsap.set('#logoType96Group',  { opacity: 1 });
      gsap.set('#logoTypeRanch',    { attr: { opacity: 1 } });
      gsap.set('#liquidStage',      { y: -32, scale: 0.82 });
    }

    var hc = document.getElementById('heroContent');
    if (hc) {
      hc.style.opacity = '1';
      hc.style.pointerEvents = 'auto';
    }

    onIntroComplete();
  }

  function initLiquidLogo() {
    // Respect prefers-reduced-motion — show final state instantly
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var intro = document.getElementById('liquidIntro');
      if (intro) intro.style.display = 'none';
      var hc = document.getElementById('heroContent');
      if (hc) { hc.style.opacity = '1'; hc.style.pointerEvents = 'auto'; }
      return;
    }

    createDroplets();

    if (typeof gsap !== 'undefined') {
      buildTimeline();
    } else {
      var waited = 0;
      var poll = setInterval(function () {
        waited += 100;
        if (typeof gsap !== 'undefined') { clearInterval(poll); buildTimeline(); }
        else if (waited >= 2500)          { clearInterval(poll); completeIntro(); }
      }, 100);
    }

    var skip = document.getElementById('liquidSkip');
    if (skip) skip.addEventListener('click', completeIntro);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLiquidLogo);
  } else {
    initLiquidLogo();
  }

})();
