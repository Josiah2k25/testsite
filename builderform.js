// Modern JavaScript with no deprecated APIs
(function() {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
  } else {
    initializeApp();
  }

  function initializeApp() {
    initializeNavbar();
    initializeBackToTop();
    initializeMobileMenu();
    initializeFormHandling();
    initializeAccessibility();
  }

  // Navbar functionality with modern scroll handling
  function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let ticking = false;
    
    function updateNavbar() {
      if (window.scrollY > 50) {
        navbar.classList.add('solid');
      } else {
        navbar.classList.remove('solid');
      }
      ticking = false;
    }

    function handleScroll() {
      if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    if (window.scrollY > 50) {
      navbar.classList.add('solid');
    }
  }

  // Back to top button with modern scroll handling
  function initializeBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;

    let ticking = false;

    function updateBackToTop() {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
      ticking = false;
    }

    function handleScroll() {
      if (!ticking) {
        requestAnimationFrame(updateBackToTop);
        ticking = true;
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    backToTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Mobile menu functionality
  function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbarLinks = document.querySelector('.navbar-links');
    
    if (!mobileMenuBtn || !navbarLinks) return;

  function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbarLinks = document.querySelector('.navbar-links');
    
    if (!mobileMenuBtn || !navbarLinks) return;

    mobileMenuBtn.addEventListener('click', function() {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      
      mobileMenuBtn.classList.toggle('active');
      navbarLinks.classList.toggle('active');
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
    });

    // Close menu when clicking on links
    navbarLinks.addEventListener('click', function(e) {
      if (e.target.tagName === 'A') {
        mobileMenuBtn.classList.remove('active');
        navbarLinks.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navbarLinks.classList.contains('active')) {
        mobileMenuBtn.classList.remove('active');
        navbarLinks.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Form handling with error management
  function initializeFormHandling() {
    const formContainer = document.querySelector('.adobe-form-container');
    const formFallback = document.getElementById('form-fallback');
    
    if (!formContainer) return;

    // Responsive iframe sizing
    function resizeForm() {
      const iframe = formContainer.querySelector('iframe');
      if (iframe) {
        if (window.innerWidth < 768) {
          iframe.style.minHeight = '600px';
        } else if (window.innerWidth < 1024) {
          iframe.style.minHeight = '700px';
        } else {
          iframe.style.minHeight = '800px';
        }
      }
    }

    // Initial resize and window resize listener
    resizeForm();
    let resizeTimeout;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeForm, 150);
    });

    // Handle form completion messages
    window.addEventListener('message', function(event) {
      // Verify origin for security
      if (!event.origin.includes('adobe.com')) return;
      
      try {
        let data;
        if (typeof event.data === 'string') {
          data = JSON.parse(event.data);
        } else {
          data = event.data;
        }
        
        if (data && data.status === 'COMPLETE') {
          showSuccessMessage();
        }
      } catch (error) {
        console.log('Message parsing failed:', error);
      }
    });

    // Form load timeout fallback
    setTimeout(function() {
      const iframe = formContainer.querySelector('iframe');
      if (iframe && !iframe.contentDocument && formFallback) {
        showFormFallback();
      }
    }, 10000); // 10 second timeout
  }

  // Global iframe load handler
  window.handleIframeLoad = function() {
    console.log('Form loaded successfully');
  };

  // Global iframe error handler
  window.handleIframeError = function() {
    showFormFallback();
  };

  function showFormFallback() {
    const formFallback = document.getElementById('form-fallback');
    const iframe = document.querySelector('.adobe-form-container iframe');
    
    if (formFallback && iframe) {
      iframe.style.display = 'none';
      formFallback.classList.add('show');
    }
  }

  function showSuccessMessage() {
    // Create success overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
    `;

    const message = document.createElement('div');
    message.style.cssText = `
      background: white;
      padding: 40px;
      border-radius: 12px;
      max-width: 500px;
      text-align: center;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    `;

    message.innerHTML = `
      <div style="color: #c1743c; font-size: 3rem; margin-bottom: 20px;">
        <i class="fas fa-check-circle"></i>
      </div>
      <h3 style="color: #1a1a1a; margin-bottom: 15px; font-size: 1.5rem;">Application Submitted!</h3>
      <p style="color: #6b7280; margin-bottom: 25px; line-height: 1.6;">
        Thank you for your builder application. We'll review your submission and contact you within 2-3 business days.
      </p>
      <button onclick="this.parentElement.parentElement.remove()" 
              style="background: #c1743c; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600;">
        Close
      </button>
    `;

    overlay.appendChild(message);
    document.body.appendChild(overlay);

    // Auto-remove after 10 seconds
    setTimeout(() => {
      if (overlay.parentNode) {
        overlay.remove();
      }
    }, 10000);
  }

  // Accessibility improvements
  function initializeAccessibility() {
    // Add skip links functionality
    const skipLinks = document.querySelectorAll('a[href^="#"]');
    skipLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.focus();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Improve focus management
    document.addEventListener('keydown', function(e) {
      // Tab trap for mobile menu
      const navbarLinks = document.querySelector('.navbar-links');
      if (navbarLinks && navbarLinks.classList.contains('active') && e.key === 'Tab') {
        const focusableElements = navbarLinks.querySelectorAll('a');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    });
  }

  // Error handling for uncaught errors
  window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Don't show errors to users, just log them
  });

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    e.preventDefault(); // Prevent the default browser behavior
  });

})();
