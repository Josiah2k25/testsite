document.addEventListener('DOMContentLoaded', function() {
  // Fix for blank map
  setTimeout(function() {
    // First check if map variable exists globally
    if (typeof map !== 'undefined') {
      // Force map to update its size and redraw
      map.invalidateSize(true);
      
      // Make sure the initial coordinates are set
      map.setView([25.918443, -97.395774], 17);
      
      // Re-add the tile layer in case it failed to load
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);
      
      // Re-add the marker
      if (typeof jupiterMarker !== 'undefined' && jupiterMarker) {
        jupiterMarker.remove();
      }
      
      // Create a new marker at the coordinates
      jupiterMarker = L.marker([25.918443, -97.395774]).addTo(map)
        .bindPopup("Lunar Estates")
        .openPopup();
      
    } else {
      // If map doesn't exist, we need to create it
      console.log("Map doesn't exist, creating new map");
      
      // Make sure we have the map container
      const mapContainer = document.getElementById('map');
      if (mapContainer) {
        // Initialize the map
        window.map = L.map('map').setView([25.918443, -97.395774], 17);
        
        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(window.map);
        
        // Add marker
        window.jupiterMarker = L.marker([25.918443, -97.395774]).addTo(window.map)
          .bindPopup("Lunar Estates")
          .openPopup();
      }
    }
    
    // Make sure the map container is visible
    const mapContainerDiv = document.querySelector('.map-container');
    if (mapContainerDiv) {
      mapContainerDiv.style.display = 'block';
      mapContainerDiv.style.visibility = 'visible';
      mapContainerDiv.style.width = '80%';
      mapContainerDiv.style.height = '450px';
    }
    
    // Make sure the map div itself is visible
    const mapDiv = document.getElementById('map');
    if (mapDiv) {
      mapDiv.style.width = '100%';
      mapDiv.style.height = '100%';
      mapDiv.style.display = 'block';
      mapDiv.style.visibility = 'visible';
    }
    
  }, 500); // Wait 500ms to ensure the page has loaded
});

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
