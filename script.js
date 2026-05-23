/* ==========================================================================
   Main Interactivity - Praful Kumar Portfolio
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- Theme Toggle Control ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  // Read saved theme or default to dark-mode
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'light') {
    body.classList.remove('dark-mode');
  } else {
    body.classList.add('dark-mode');
  }

  themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const activeTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('portfolio-theme', activeTheme);
  });


  // --- Mobile Hamburger Menu ---
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuToggle.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });


  // --- Sticky Header Shadow on Scroll ---
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('nav-scrolled');
    } else {
      navbar.classList.remove('nav-scrolled');
    }
  });


  // --- Typewriter Effect ---
  const typewriterText = document.getElementById('typewriter-text');
  const roles = [
    "Full-Stack Developer.",
    "Software Security Trainee.",
    "Problem Solver.",
    "B.Tech CSE Student."
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 50; // Speed up typing (50ms per character)

  function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      // Erasing characters
      typewriterText.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 30; // Erase faster (30ms per character)
    } else {
      // Typing characters
      typewriterText.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 50;
    }

    // Switch states
    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 800; // Pause at end of word (800ms)
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 300; // Pause before typing next word (300ms)
    }

    setTimeout(type, typingSpeed);
  }

  // Start the typewriter loop
  if (typewriterText) {
    type();
  }


  // --- Intersection Observer for Scroll Reveal & Skill Progress ---
  const revealElements = document.querySelectorAll('.reveal');
  const progressBars = document.querySelectorAll('.prof-progress');
  
  const observerOptions = {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // If this element contains proficiency progress bars, animate them
        if (entry.target.classList.contains('proficiencies-container') || entry.target.querySelector('.prof-progress')) {
          progressBars.forEach(bar => {
            const widthVal = bar.style.width;
            // Temporarily set to 0 and re-apply to trigger transition animation
            bar.style.width = '0';
            setTimeout(() => {
              bar.style.width = widthVal;
            }, 100);
          });
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });


  // --- Active Nav Highlighting on Scroll ---
  const sections = document.querySelectorAll('section');
  
  const navObserverOptions = {
    root: null,
    threshold: 0.3,
    rootMargin: '-70px 0px -30% 0px' // accounts for navbar height
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, navObserverOptions);

  sections.forEach(sec => {
    navObserver.observe(sec);
  });


  // --- Download Resume / Print PDF Action ---
  const downloadResumeBtn = document.getElementById('btn-resume-download');
  if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', () => {
      // Temporarily change document title to a professional name for PDF file naming
      const originalTitle = document.title;
      document.title = "Resume_Praful_Kumar";
      
      // Trigger native print flow (CSS @media print styles take over)
      window.print();
      
      // Restore page title
      document.title = originalTitle;
    });
  }


  // --- Scroll to Top Button ---
  const scrollToTopBtn = document.getElementById('scroll-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add('show');
    } else {
      scrollToTopBtn.classList.remove('show');
    }
  });

  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

});
