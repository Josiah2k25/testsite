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

// Set map view to the new pin location
const initialLatLng = [25.918443, -97.395774];
const map = L.map('map').setView(initialLatLng, 17);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Place a default pin at the new coordinates
let jupiterMarker = L.marker(initialLatLng).addTo(map)
  .bindPopup("Jupiter Street Pin at 25.918443, -97.395774")
  .openPopup();

// "Find Jupiter Street" button re-centers the map and opens popup
document.getElementById('find-jupiter').addEventListener('click', () => {
  map.setView(initialLatLng, 17);
  jupiterMarker.openPopup();
});

// Drop pin on map click
let pin;
document.getElementById('drop-pin').addEventListener('click', () => {
  map.once('click', function (e) {
    if (pin) {
      map.removeLayer(pin);
    }
    pin = L.marker(e.latlng).addTo(map)
      .bindPopup("Custom pin at " + e.latlng.toString())
      .openPopup();
    document.getElementById('notification').textContent = "Pin dropped.";
  });

  document.getElementById('notification').textContent = "Click on the map to drop a pin.";
});

// Reset map button functionality
document.getElementById('reset-map').addEventListener('click', () => {
  map.setView(initialLatLng, 17);
  if (pin) {
    map.removeLayer(pin);
    pin = null;
  }
  document.getElementById('notification').textContent = "Map reset to Jupiter Street pin.";
});
