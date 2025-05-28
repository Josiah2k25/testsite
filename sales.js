

document.addEventListener('DOMContentLoaded', function() {
    
    const phaseButtons = document.querySelectorAll('.phases-btn');
    
    phaseButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const dropdown = this.nextElementSibling;
            
            dropdown.classList.toggle('active');
            
            phaseButtons.forEach(otherButton => {
                if (otherButton !== button) {
                    const otherDropdown = otherButton.nextElementSibling;
                    if (otherDropdown.classList.contains('active')) {
                        otherDropdown.classList.remove('active');
                    }
                }
            });
        });
    });
    
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.phases-wrapper')) {
            document.querySelectorAll('.phases-dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
    
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbarLinks = document.querySelector('.navbar-links');
    
    if (mobileMenuBtn && navbarLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navbarLinks.classList.toggle('active');
        });
    }
    
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // Console log for debugging
    console.log('Sales page script loaded. Dropdown buttons found:', phaseButtons.length);
});
