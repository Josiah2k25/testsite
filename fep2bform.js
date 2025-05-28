// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('solid');
      } else {
        navbar.classList.remove('solid');
      }
    });
    
    // Initial check on page load
    if (window.scrollY > 50) {
      navbar.classList.add('solid');
    }
  }
  
  // Back to Top Button Functionality
  const backToTopBtn = document.getElementById('back-to-top');
  
  if (backToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });
    
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
  
  // Adobe Sign form resizing for responsive design
  function resizeAdobeForm() {
    const formContainer = document.querySelector('.adobe-form-container');
    if (formContainer) {
      const iframe = formContainer.querySelector('iframe');
      if (iframe) {
        // Adjust iframe height based on screen size
        if (window.innerWidth < 768) {
          iframe.style.minHeight = '600px';
        } else {
          iframe.style.minHeight = '800px';
        }
      }
    }
  }
  
  resizeAdobeForm();
  window.addEventListener('resize', resizeAdobeForm);
  
  window.addEventListener('message', function(event) {
    if (event.origin.includes('na1.documents.adobe.com')) {
      try {
        const data = JSON.parse(event.data);
        
        if (data.status === 'COMPLETE') {
          alert('Thank you! Your application has been submitted successfully.');
 
        }
      } catch (e) {
      }
    }
  });
});
