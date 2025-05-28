document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const navbar = document.querySelector('.navbar');
  const backToTopBtn = document.getElementById('back-to-top');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navbarLinks = document.querySelector('.navbar-links');
  const authTabs = document.querySelectorAll('.auth-tab');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  
  // Navbar scroll effect
  if (navbar) {
    const handleScroll = () => navbar.classList.toggle('solid', window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
  }
  
  // Back to top button
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      backToTopBtn.classList.toggle('show', window.pageYOffset > 300);
    });
    
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  
  // Mobile menu toggle
  if (mobileMenuBtn && navbarLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      navbarLinks.classList.toggle('active');
    });
  }
  
  // Auth tabs functionality
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
  
  // Form validation helpers
  const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = phone => /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone);
  
  // Login form submission
  const loginFormEl = loginForm?.querySelector('form');
  if (loginFormEl) {
    loginFormEl.addEventListener('submit', async function(e) {
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
      
      try {
        const response = await simulateAuth('login', { email, password, userType: 'individual' });
        if (response.success) {

          window.location.href = 'fep2iform.html';
        } else {
          alert(response.message || 'Login failed. Please try again.');
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login. Please try again.');
      }
    });
  }
  
  // Signup form submission
  const signupFormEl = signupForm?.querySelector('form');
  if (signupFormEl) {
    signupFormEl.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const formData = {
        fullName: document.getElementById('full-name').value,
        email: document.getElementById('signup-email').value,
        phone: document.getElementById('phone').value,
        password: document.getElementById('signup-password').value,
        confirmPassword: document.getElementById('confirm-password').value,
        termsAccepted: document.getElementById('terms').checked
      };
      
      // Validation
      if (!formData.fullName.trim()) {
        alert('Please enter your full name');
        return;
      }
      
      if (!validateEmail(formData.email)) {
        alert('Please enter a valid email address');
        return;
      }
      
      if (!validatePhone(formData.phone)) {
        alert('Please enter a valid phone number');
        return;
      }
      
      if (formData.password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      
      if (!formData.termsAccepted) {
        alert('You must accept the Terms of Service and Privacy Policy');
        return;
      }
      
      try {
        const response = await simulateAuth('signup', { 
          ...formData, 
          userType: 'individual' 
        });
        
        if (response.success) {
          alert('Account created successfully! You can now log in.');
          document.querySelector('[data-tab="login"]').click();
        } else {
          alert(response.message || 'Signup failed. Please try again.');
        }
      } catch (error) {
        console.error('Signup error:', error);
        alert('An error occurred during signup. Please try again.');
      }
    });
  }
  
  // Simulated authentication (replace with actual API calls)
  function simulateAuth(type, data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const storageKey = 'rio_tierra_individual_users';
        const users = JSON.parse(localStorage.getItem(storageKey) || '[]');
        
        if (type === 'login') {
          const user = users.find(u => u.email === data.email && u.password === data.password);
          if (user) {
            localStorage.setItem('rio_tierra_current_user', JSON.stringify({
              email: user.email,
              fullName: user.fullName,
              userType: data.userType
            }));
            resolve({ success: true });
          } else {
            resolve({ success: false, message: 'Invalid email or password' });
          }
        } else if (type === 'signup') {
          if (users.some(u => u.email === data.email)) {
            resolve({ success: false, message: 'Email already registered' });
            return;
          }
          
          users.push({
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            password: data.password,
            userType: data.userType,
            registeredAt: new Date().toISOString()
          });
          
          localStorage.setItem(storageKey, JSON.stringify(users));
          resolve({ success: true });
        }
      }, 1000);
    });
  }
});
