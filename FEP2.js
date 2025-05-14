// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Apply Now Button Functionality
  const applyNowBtn = document.getElementById('apply-now-btn');
  const applicationTypes = document.getElementById('application-types');
  
  if (applyNowBtn && applicationTypes) {
    applyNowBtn.addEventListener('click', function() {
      // Toggle display of application types
      if (applicationTypes.style.display === 'block') {
        applicationTypes.style.display = 'none';
      } else {
        applicationTypes.style.display = 'block';
      }
    });
  }
  
  // Back to Top Button Functionality
  const backToTopBtn = document.getElementById('back-to-top');
  
  if (backToTopBtn) {
    // Show button when user scrolls down 300px from the top
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });
    
    // Scroll to top when button is clicked
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navbarLinks = document.querySelector('.navbar-links');
  
  if (mobileMenuBtn && navbarLinks) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenuBtn.classList.toggle('active');
      navbarLinks.classList.toggle('active');
    });
  }
  
  // Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');
  
  if (navbar) {
    // Initial check in case page is loaded already scrolled down
    if (window.scrollY > 50) {
      navbar.classList.add('solid');
    }
    
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('solid');
      } else {
        navbar.classList.remove('solid');
      }
    });
  }
});
document.addEventListener('DOMContentLoaded', function() {
    // Original site functionality 
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbarLinks = document.querySelector('.navbar-links');
    if (mobileMenuBtn && navbarLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navbarLinks.classList.toggle('active');
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // Back to top button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Plat placeholder
    const platPlaceholder = document.querySelector('.plat-placeholder');
    if (platPlaceholder) {
        platPlaceholder.addEventListener('click', () => {
            alert('Interactive plat feature coming soon! Check back for updates.');
        });
    }

    // Apply Now Button Functionality
    const applyNowBtn = document.getElementById('apply-now-btn');
    const applicationTypes = document.getElementById('application-types');
    
    if (applyNowBtn && applicationTypes) {
        applyNowBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Show application types
            applicationTypes.style.display = 'block';
            // Scroll to application types
            applicationTypes.scrollIntoView({behavior: 'smooth'});
        });
    }

    console.log('LEP2 page script loaded successfully');
});
