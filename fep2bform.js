document.addEventListener('DOMContentLoaded', function() {
  initNavbar();
  initBackToTop();
  initMobileMenu();
  initAdobeForm();
});

function initNavbar() {
  const navbar = document.querySelector('.navbar');
  
  if (!navbar) return;
  
  function updateNavbar() {
    if (window.scrollY > 50) {
      navbar.classList.add('solid');
    } else {
      navbar.classList.remove('solid');
    }
  }
  
  window.addEventListener('scroll', updateNavbar);
  updateNavbar();
}

function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  
  if (!backToTopBtn) return;
  
  function toggleBackToTop() {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  }
  
  window.addEventListener('scroll', toggleBackToTop);
  
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

function initMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navbarLinks = document.querySelector('.navbar-links');
  
  if (!mobileMenuBtn || !navbarLinks) return;
  
  mobileMenuBtn.addEventListener('click', function() {
    mobileMenuBtn.classList.toggle('active');
    navbarLinks.classList.toggle('active');
  });
  
  // Close mobile menu when clicking on a link
  const navLinks = navbarLinks.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenuBtn.classList.remove('active');
      navbarLinks.classList.remove('active');
    });
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    if (!mobileMenuBtn.contains(event.target) && !navbarLinks.contains(event.target)) {
      mobileMenuBtn.classList.remove('active');
      navbarLinks.classList.remove('active');
    }
  });
}

function initAdobeForm() {
  const formContainer = document.querySelector('.adobe-form-container');
  if (!formContainer) return;
  
  const iframe = formContainer.querySelector('iframe');
  if (!iframe) return;
  
  function resizeForm() {
    const screenWidth = window.innerWidth;
    
    if (screenWidth <= 360) {
      iframe.style.height = '450px';
    } else if (screenWidth <= 480) {
      iframe.style.height = '500px';
    } else if (screenWidth <= 768) {
      iframe.style.height = '600px';
    } else {
      iframe.style.height = '800px';
    }
  }
  
  resizeForm();
  window.addEventListener('resize', resizeForm);
  
  // Handle form messages from Adobe Sign
  window.addEventListener('message', function(event) {
    if (event.origin.includes('na1.documents.adobe.com')) {
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        
        if (data.status === 'COMPLETE') {
          showNotification('Thank you! Your application has been submitted successfully.', 'success');
        } else if (data.status === 'ERROR') {
          showNotification('There was an error submitting your application. Please try again.', 'error');
        }
      } catch (e) {
        // Ignore non-JSON messages
      }
    }
  });
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-message">${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `;
  
  // Add notification styles if not already present
  if (!document.querySelector('#notification-styles')) {
    const styles = document.createElement('style');
    styles.id = 'notification-styles';
    styles.textContent = `
      .notification {
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10000;
        max-width: 400px;
        padding: 16px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
      }
      
      .notification.show {
        transform: translateX(0);
      }
      
      .notification-success {
        background: #d4edda;
        border: 1px solid #c3e6cb;
        color: #155724;
      }
      
      .notification-error {
        background: #f8d7da;
        border: 1px solid #f5c6cb;
        color: #721c24;
      }
      
      .notification-info {
        background: #d1ecf1;
        border: 1px solid #bee5eb;
        color: #0c5460;
      }
      
      .notification-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
      }
      
      .notification-close {
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        line-height: 1;
        opacity: 0.7;
      }
      
      .notification-close:hover {
        opacity: 1;
      }
      
      @media (max-width: 480px) {
        .notification {
          right: 10px;
          left: 10px;
          max-width: none;
        }
      }
    `;
    document.head.appendChild(styles);
  }
  
  document.body.appendChild(notification);
  
  setTimeout(() => notification.classList.add('show'), 100);
  
  const autoRemove = setTimeout(() => removeNotification(notification), 5000);
  
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    clearTimeout(autoRemove);
    removeNotification(notification);
  });
}

function removeNotification(notification) {
  notification.classList.remove('show');
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 300);
}

document.addEventListener('click', function(event) {
  const link = event.target.closest('a[href^="#"]');
  if (!link) return;
  
  const targetId = link.getAttribute('href');
  if (targetId === '#') return;
  
  const targetElement = document.querySelector(targetId);
  if (!targetElement) return;
  
  event.preventDefault();
  
  const offsetTop = targetElement.offsetTop - 80; 
  
  window.scrollTo({
    top: offsetTop,
    behavior: 'smooth'
  });
});

function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const throttledScroll = throttle(function() {

}, 16); 

window.addEventListener('scroll', throttledScroll);
