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