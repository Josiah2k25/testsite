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
  
  // Auth Tabs Functionality
  const authTabs = document.querySelectorAll('.auth-tab');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  
  if (authTabs.length > 0) {
    authTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        authTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        const tabType = this.getAttribute('data-tab');
        
        if (tabType === 'login') {
          loginForm.classList.remove('hidden');
          signupForm.classList.add('hidden');
        } else {
          loginForm.classList.add('hidden');
          signupForm.classList.remove('hidden');
        }
      });
    });
  }
  
  // Form Validation and Submission
  const loginFormEl = loginForm?.querySelector('form');
  const signupFormEl = signupForm?.querySelector('form');
  
  if (loginFormEl) {
    loginFormEl.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      
      if (!validateEmail(email)) {
        alert('Please enter a valid email address');
        return;
      }
      
      if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
      }
      
      simulateServerRequest('login', { email, password })
        .then(response => {
          if (response.success) {
            window.location.href = 'fep2bform.html';
          } else {
            alert(response.message || 'Login failed. Please try again.');
          }
        })
        .catch(error => {
          console.error('Login error:', error);
          alert('An error occurred during login. Please try again.');
        });
    });
  }
  
  if (signupFormEl) {
    signupFormEl.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const company = document.getElementById('company-name').value;
      const email = document.getElementById('signup-email').value;
      const phone = document.getElementById('phone').value;
      const password = document.getElementById('signup-password').value;
      const confirmPassword = document.getElementById('confirm-password').value;
      const termsAccepted = document.getElementById('terms').checked;
      
      if (!company.trim()) {
        alert('Please enter your company name');
        return;
      }
      
      if (!validateEmail(email)) {
        alert('Please enter a valid email address');
        return;
      }
      
      if (!validatePhone(phone)) {
        alert('Please enter a valid phone number');
        return;
      }
      
      if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
      }
      
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      
      if (!termsAccepted) {
        alert('You must accept the Terms of Service and Privacy Policy');
        return;
      }
      
      simulateServerRequest('signup', { company, email, phone, password })
        .then(response => {
          if (response.success) {
            alert('Account created successfully! You can now log in.');
            document.querySelector('[data-tab="login"]').click();
          } else {
            alert(response.message || 'Signup failed. Please try again.');
          }
        })
        .catch(error => {
          console.error('Signup error:', error);
          alert('An error occurred during signup. Please try again.');
        });
    });
  }
  
  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  function validatePhone(phone) {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return re.test(String(phone));
  }
  
  function simulateServerRequest(type, data) {
    return new Promise((resolve, reject) => {
      console.log(`Simulating ${type} request with data:`, data);
      
      setTimeout(() => {
        if (type === 'login') {
          const users = JSON.parse(localStorage.getItem('rio_tierra_users') || '[]');
          const user = users.find(u => u.email === data.email);
          
          if (user && user.password === data.password) {
            localStorage.setItem('rio_tierra_current_user', JSON.stringify({
              email: user.email,
              company: user.company
            }));
            
            resolve({ success: true });
          } else {
            resolve({ 
              success: false, 
              message: 'Invalid email or password'
            });
          }
        } 
        else if (type === 'signup') {
          const users = JSON.parse(localStorage.getItem('rio_tierra_users') || '[]');
          
          if (users.some(u => u.email === data.email)) {
            resolve({ 
              success: false, 
              message: 'Email already registered. Please log in instead.'
            });
            return;
          }
          
          users.push({
            company: data.company,
            email: data.email,
            phone: data.phone,
            password: data.password,
            registeredAt: new Date().toISOString()
          });
          
          localStorage.setItem('rio_tierra_users', JSON.stringify(users));
          
          resolve({ success: true });
        }
      }, 1000);
    });
  }
});
if (response.success) {
  alert('Login successful! Redirecting to FEP2 Builder Form...');
  window.location.href = 'fep2bform.html';
}
