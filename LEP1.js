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
