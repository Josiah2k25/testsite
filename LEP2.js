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
