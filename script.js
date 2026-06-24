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
// LIQUID LOGO HERO — Implementation 007
// ============================================================

(function () {

  // Cluster zones mapped to real logo regions (500×708 viewBox)
  // Derived from pixel extraction of 96inklogo.png
  var CLUSTERS = {
    handle: { cx: 249, cy:  75, r: 46, count: 10 },  // top knob
    board:  { cx: 249, cy: 390, r: 110, count: 18 },  // main cutting board body
    spoon:  { cx:  92, cy: 280, r:  55, count: 14 },  // spoon bowl + handle
    fork:   { cx: 385, cy: 370, r:  50, count: 14 }   // fork tines + handle
  };

  var droplets = [];
  var introTl  = null;
  var idleTl   = null;

  function randBetween(a, b) {
    return a + Math.random() * (b - a);
  }

  function createDroplets() {
    var gooLayer = document.getElementById('gooLayer');
    if (!gooLayer) return;

    var clusterKeys = Object.keys(CLUSTERS);

    clusterKeys.forEach(function (key) {
      var c = CLUSTERS[key];
      for (var i = 0; i < c.count; i++) {
        // Random scatter position (will be pulled to cluster in State 2)
        var sx = randBetween(30, 470);
        var sy = randBetween(30, 678);
        var r  = randBetween(4, 10);

        var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', sx);
        circle.setAttribute('cy', sy);
        circle.setAttribute('r',  r);
        circle.setAttribute('fill', '#111111');
        circle.setAttribute('opacity', '0');
        gooLayer.appendChild(circle);

        droplets.push({ el: circle, cluster: key, cx: c.cx, cy: c.cy, r: r, sx: sx, sy: sy });
      }
    });
  }

  function buildTimeline() {
    if (typeof gsap === 'undefined') {
      // GSAP not loaded — skip straight to final
      completeIntro();
      return;
    }

    introTl = gsap.timeline({ onComplete: onIntroComplete });

    // ── State 1 (~0–1.1s): droplets appear scattered ──────────────────────
    droplets.forEach(function (d, i) {
      introTl.to(d.el, {
        attr: { opacity: 1 },
        duration: 0.35,
        ease: 'back.out(1.4)',
        delay: randBetween(0, 0.9)
      }, 0);
    });

    // ── State 2 (~1.1–3.1s): gather toward cluster centroids ──────────────
    droplets.forEach(function (d) {
      var pull = CLUSTERS[d.cluster];
      var angle = Math.random() * Math.PI * 2;
      var dist  = randBetween(8, pull.r * 0.7);
      introTl.to(d.el, {
        attr: {
          cx: pull.cx + Math.cos(angle) * dist,
          cy: pull.cy + Math.sin(angle) * dist
        },
        duration: 2.0,
        ease: 'sine.inOut'
      }, 1.1);
    });

    // ── State 3 (~3.1–4.5s): collapse to centers, radii grow → goo merge ─
    droplets.forEach(function (d) {
      var pull = CLUSTERS[d.cluster];
      introTl.to(d.el, {
        attr: {
          cx: pull.cx + randBetween(-6, 6),
          cy: pull.cy + randBetween(-6, 6),
          r:  d.r * randBetween(2.2, 3.4)
        },
        duration: 1.4,
        ease: 'power3.inOut'
      }, 3.1);
    });

    // ── State 4 (~4.5–5.3s): goo fades out, logo fades in ────────────────
    introTl.to('#gooWrap', {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut'
    }, 4.5);

    introTl.to('#logoSvgWrap', {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'power2.out'
    }, 4.5);

    // ── State 5 (~5.3–6.5s): typography appears ───────────────────────────
    introTl.to('#logoType96', {
      attr: { opacity: 1 },
      y: 0,
      duration: 0.7,
      ease: 'power3.out'
    }, 5.3);

    introTl.to('#logoTypeRanch', {
      attr: { opacity: 1 },
      y: 0,
      duration: 0.6,
      ease: 'power3.out'
    }, 5.7);

    // ── State 6 (~6.6–7.5s): scale down, drift up, hero content fades in ─
    introTl.to('#liquidStage', {
      y: -28,
      scale: 0.86,
      duration: 0.9,
      ease: 'power2.inOut'
    }, 6.6);

    introTl.to('#heroContent', {
      opacity: 1,
      duration: 0.9,
      ease: 'power2.out',
      onStart: function () {
        document.getElementById('heroContent').style.pointerEvents = 'auto';
      }
    }, 6.9);
  }

  function onIntroComplete() {
    // Hide intro overlay
    var intro = document.getElementById('liquidIntro');
    if (intro) {
      intro.classList.add('done');
    }
    // Start floating idle on logo
    var wrap = document.getElementById('logoSvgWrap');
    if (wrap) {
      wrap.classList.add('floating');
      // Keep logo visible above hero bg inside hero section
      wrap.style.position = 'absolute';
    }
    // Start idle GSAP float (subtle, Apple-style)
    startIdleFloat();
  }

  function startIdleFloat() {
    if (typeof gsap === 'undefined') return;
    var stage = document.getElementById('liquidStage');
    if (!stage) return;

    idleTl = gsap.timeline({ repeat: -1, yoyo: true });
    idleTl.to(stage, {
      y: '-=14',
      scaleX: 1.014,
      scaleY: 1.014,
      duration: 3.2,
      ease: 'sine.inOut'
    });
  }

  function completeIntro() {
    // Jump to final state instantly (skip / prefers-reduced-motion)
    if (introTl) {
      introTl.kill();
      introTl = null;
    }
    gsap && gsap.set('#gooWrap',     { opacity: 0 });
    gsap && gsap.set('#logoSvgWrap', { opacity: 1 });
    gsap && gsap.set('#logoType96',  { attr: { opacity: 1 } });
    gsap && gsap.set('#logoTypeRanch', { attr: { opacity: 1 } });
    gsap && gsap.set('#liquidStage', { y: -28, scale: 0.86 });

    var heroContent = document.getElementById('heroContent');
    if (heroContent) {
      heroContent.style.opacity = '1';
      heroContent.style.pointerEvents = 'auto';
    }
    onIntroComplete();
  }

  function initLiquidLogo() {
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var intro = document.getElementById('liquidIntro');
      if (intro) intro.style.display = 'none';
      var heroContent = document.getElementById('heroContent');
      if (heroContent) {
        heroContent.style.opacity = '1';
        heroContent.style.pointerEvents = 'auto';
      }
      return;
    }

    createDroplets();

    // Wait for GSAP to load then build timeline
    if (typeof gsap !== 'undefined') {
      buildTimeline();
    } else {
      // Fallback: wait up to 2s for GSAP CDN
      var waited = 0;
      var check = setInterval(function () {
        waited += 100;
        if (typeof gsap !== 'undefined') {
          clearInterval(check);
          buildTimeline();
        } else if (waited >= 2000) {
          clearInterval(check);
          completeIntro();
        }
      }, 100);
    }

    // Skip button
    var skipBtn = document.getElementById('liquidSkip');
    if (skipBtn) {
      skipBtn.addEventListener('click', completeIntro);
    }
  }

  // Run after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLiquidLogo);
  } else {
    initLiquidLogo();
  }

})();
