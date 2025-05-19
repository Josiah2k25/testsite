document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.querySelector('.navbar');
  
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('solid');
      } else {
        navbar.classList.remove('solid');
      }
    });
    
    if (window.scrollY > 50) {
      navbar.classList.add('solid');
    }
  }
  
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
  
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navbarLinks = document.querySelector('.navbar-links');
  
  if (mobileMenuBtn && navbarLinks) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenuBtn.classList.toggle('active');
      navbarLinks.classList.toggle('active');
    });
  }
  
  function resizeAdobeForm() {
    const formContainer = document.querySelector('.adobe-form-container');
    if (formContainer) {
      const iframe = formContainer.querySelector('iframe');
      if (iframe) {
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
