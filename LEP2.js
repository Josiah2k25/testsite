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

    // Contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            console.log('Form submitted');
        });
    }

    // Plat placeholder
    const platPlaceholder = document.querySelector('.plat-placeholder');
    if (platPlaceholder) {
        platPlaceholder.addEventListener('click', () => {
            alert('Interactive plat feature coming soon! Check back for updates.');
        });
    }

    // Application cards
    const applicationCards = document.querySelectorAll('.application-card');
    if (applicationCards.length > 0) {
        applicationCards.forEach(card => {
            const downloadBtn = card.querySelector('.download-btn');
            if (downloadBtn) {
                downloadBtn.setAttribute('title', 'Click to download application form');
            }
        });
    }

    // APPLICATION TABS - IMPROVED VERSION
    const builderTab = document.getElementById('builder-tab');
    const individualTab = document.getElementById('individual-tab');
    const builderSection = document.getElementById('builder-section');
    const individualSection = document.getElementById('individual-section');

    if (builderTab && individualTab && builderSection && individualSection) {
        console.log('Application tabs found and initialized');
        
        // Initialize tabs - show builder, hide individual
        builderSection.classList.add('active');
        individualSection.classList.remove('active');
        
        // Tab click handlers
        builderTab.addEventListener('click', function() {
            console.log('Builder tab clicked');
            builderSection.classList.add('active');
            individualSection.classList.remove('active');
            builderTab.classList.add('active-tab');
            individualTab.classList.remove('active-tab');
        });
        
        individualTab.addEventListener('click', function() {
            console.log('Individual tab clicked');
            builderSection.classList.remove('active');
            individualSection.classList.add('active');
            builderTab.classList.remove('active-tab');
            individualTab.classList.add('active-tab');
        });
    } else {
        console.warn('Some application tab elements are missing');
    }

    // Form validation and payment calculation
    const individualForm = document.getElementById('individual-form');
    const builderForm = document.getElementById('builder-form');
    
    if (individualForm) {
        const priceInput = document.getElementById('individual-price');
        const downPaymentInput = document.getElementById('individual-downpayment');
        const termSelect = document.getElementById('individual-term');
        
        if (priceInput && downPaymentInput && termSelect) {
            function updatePaymentEstimate() {
                const price = parseFloat(priceInput.value) || 75000;
                const downPayment = parseFloat(downPaymentInput.value) || 3000;
                const term = parseInt(termSelect.value) || 10;
                const rate = 0.10;
                
                const loanAmount = price - downPayment;
                const monthlyRate = rate / 12;
                const numPayments = term * 12;
                const monthlyPayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numPayments));
                
                const paymentResultElement = document.getElementById('payment-result');
                if (paymentResultElement) {
                    paymentResultElement.textContent = '$' + monthlyPayment.toFixed(2);
                }
            }
            
            // Update payment when fields change
            priceInput.addEventListener('input', updatePaymentEstimate);
            downPaymentInput.addEventListener('input', updatePaymentEstimate);
            termSelect.addEventListener('change', updatePaymentEstimate);
        }
    }
    
    // Form submission handling
    if (builderForm) {
        builderForm.addEventListener('submit', function(e) {
            // Add validation logic here if needed
            console.log('Builder form submitted');
        });
    }
    
    if (individualForm) {
        individualForm.addEventListener('submit', function(e) {
            // Add validation logic here if needed
            console.log('Individual form submitted');
        });
    }

    console.log('LEP2 page script loaded successfully');
});
