document.addEventListener('DOMContentLoaded', function() {

    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbarLinks = document.querySelector('.navbar-links');
    
    if (mobileMenuBtn && navbarLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navbarLinks.classList.toggle('active');
        });
    }
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
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            console.log('Form submitted');
        });
    }
    const platPlaceholder = document.querySelector('.plat-placeholder');
    if (platPlaceholder) {
        platPlaceholder.addEventListener('click', () => {
            alert('Interactive plat feature coming soon! Check back for updates.');
        });
    }
    const applicationCards = document.querySelectorAll('.application-card');
    if (applicationCards.length > 0) {
        applicationCards.forEach(card => {
            const downloadBtn = card.querySelector('.download-btn');
            if (downloadBtn) {
                downloadBtn.setAttribute('title', 'Click to download application form');
            }
        });
    }
    console.log('LEP2 page script loaded successfully');
});

function openTab(tabName) {

  var tabContents = document.getElementsByClassName("tab-content");
  for (var i = 0; i < tabContents.length; i++) {
    tabContents[i].classList.remove("active");
  }
  var tabButtons = document.getElementsByClassName("tab-btn");
  for (var i = 0; i < tabButtons.length; i++) {
    tabButtons[i].classList.remove("active");
  }
  document.getElementById(tabName).classList.add("active");
  event.currentTarget.classList.add("active");
}

document.addEventListener('DOMContentLoaded', function() {

  if (document.getElementById('individual-form')) {
    var priceInput = document.getElementById('individual-price');
    var downPaymentInput = document.getElementById('individual-downpayment');
    var termSelect = document.getElementById('individual-term');

    function updatePaymentEstimate() {
      var price = parseFloat(priceInput.value) || 75000;
      var downPayment = parseFloat(downPaymentInput.value) || 3000;
      var term = parseInt(termSelect.value) || 10;
      var rate = 0.10; 
      
      var loanAmount = price - downPayment;
      var monthlyRate = rate / 12;
      var numPayments = term * 12;
      var monthlyPayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numPayments));
      var paymentResultElement = document.getElementById('payment-result');
      if (paymentResultElement) {
        paymentResultElement.textContent = '$' + monthlyPayment.toFixed(2);
      }
    }
    
    if (priceInput && downPaymentInput && termSelect) {
      priceInput.addEventListener('input', updatePaymentEstimate);
      downPaymentInput.addEventListener('input', updatePaymentEstimate);
      termSelect.addEventListener('change', updatePaymentEstimate);
    }
  }

  var builderForm = document.getElementById('builder-form');
  var individualForm = document.getElementById('individual-form');
  
  if (builderForm) {
    builderForm.addEventListener('submit', function(event) {
    
    });
  }
  
  if (individualForm) {
    individualForm.addEventListener('submit', function(event) {

    });
  }
});
