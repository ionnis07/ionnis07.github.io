/* ─────────────────────────────────────────────────────────────
   ION EDUARD NICHOLAS — Website Script
   Features: Progress bar, active nav, smooth scroll, lazy load
   ───────────────────────────────────────────────────────────── */

/* READING PROGRESS INDICATOR */
function updateProgressBar() {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
  
  const progressBar = document.querySelector('.progress-bar');
  if (progressBar) {
    progressBar.style.width = scrolled + '%';
  }
}

/* ACTIVE NAV LINK DETECTION */
function updateActiveNavLink() {
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section, .hero');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

/* HAMBURGER MENU TOGGLE (Mobile) */
function initHamburgerMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
    
    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }
}

/* SMOOTH SCROLL ON ANCHOR CLICKS */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Only prevent default for valid sections
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        const target = document.querySelector(href);
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* LAZY LOAD IMAGES */
function initLazyLoad() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for browsers without IntersectionObserver
    images.forEach(img => {
      img.src = img.dataset.src || img.src;
    });
  }
}

/* DARK MODE TOGGLE (Optional - removed for minimal design) */
// Keeping for future use if client wants it

/* INIT ALL */
document.addEventListener('DOMContentLoaded', () => {
  initHamburgerMenu();
  initSmoothScroll();
  initLazyLoad();
  updateProgressBar();
  updateActiveNavLink();
});

/* UPDATE PROGRESS BAR ON SCROLL */
window.addEventListener('scroll', () => {
  updateProgressBar();
  updateActiveNavLink();
});

/* UPDATE ON RESIZE */
window.addEventListener('resize', () => {
  updateActiveNavLink();
});
