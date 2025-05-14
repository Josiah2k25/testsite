// Create the map and set initial view to Jupiter Street
const map = L.map('map').setView([25.9560, -97.4790], 17); // Zoom level 17 for street view

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Optional: Add a marker at Jupiter Street
let jupiterMarker = L.marker([25.9560, -97.4790]).addTo(map)
  .bindPopup("8629 Jupiter Street, Brownsville, TX")
  .openPopup();

// Find Jupiter Street button functionality
document.getElementById('find-jupiter').addEventListener('click', () => {
  map.setView([25.9560, -97.4790], 17);
  jupiterMarker.openPopup();
});

// Drop pin functionality
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

// Reset map view
document.getElementById('reset-map').addEventListener('click', () => {
  map.setView([25.9560, -97.4790], 17);
  if (pin) {
    map.removeLayer(pin);
    pin = null;
  }
  document.getElementById('notification').textContent = "Map reset to Jupiter Street.";
});
