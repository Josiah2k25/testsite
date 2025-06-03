document.addEventListener('DOMContentLoaded', function() {
    addMapStyles();
    setTimeout(initializeMap, 500);
    setupScrollEffects();
});

function initializeMap() {
    const mapContainer = document.getElementById('map');
    
    if (!mapContainer) {
        console.error('Map container not found');
        return;
    }
    
    if (typeof L === 'undefined') {
        console.error('Leaflet library not loaded');
        showMapFallback();
        return;
    }
    
    try {
        const jupiterStreetCoords = [25.918476, -97.395797];
        
        const map = L.map('map', {
            center: jupiterStreetCoords,
            zoom: 16,
            zoomControl: true,
            scrollWheelZoom: true,
            touchZoom: true,
            doubleClickZoom: true,
            boxZoom: true,
            keyboard: true
        });
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/contributors">OpenStreetMap</a> contributors',
            maxZoom: 19,
            minZoom: 10
        }).addTo(map);
        
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: '<div class="marker-pin"><i class="fas fa-map-marker-alt"></i></div>',
            iconSize: [40, 50],
            iconAnchor: [20, 50],
            popupAnchor: [0, -50]
        });
        
        const marker = L.marker(jupiterStreetCoords, { icon: customIcon }).addTo(map);
        
        const popupContent = `
            <div class="map-popup">
                <div class="popup-header">
                    <h3>Lunar Estates Phase 1</h3>
                    <div class="popup-badge">Premium Development</div>
                </div>
                <div class="popup-details">
                    <div class="detail-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>Jupiter Street, Brownsville, TX 78521</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-home"></i>
                        <span>Residential Community</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-star"></i>
                        <span>Phase 1 Development</span>
                    </div>
                </div>
                <a href="Lunar Estates Phase I CCRs.PDF" class="popup-download" download>
                    <i class="fas fa-download"></i>
                    <span>Download Deed Restrictions</span>
                </a>
            </div>
        `;
        
        marker.bindPopup(popupContent, {
            maxWidth: 350,
            minWidth: 280,
            className: 'custom-popup',
            closeButton: true,
            autoClose: false,
            closeOnEscapeKey: true
        });
        
        setTimeout(() => {
            map.invalidateSize();
            marker.openPopup();
        }, 200);
        
        window.lunarEstatesMap = map;
        window.lunarEstatesMarker = marker;
        
    } catch (error) {
        console.error('Map initialization error:', error);
        showMapFallback();
    }
}

function showMapFallback() {
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
        mapContainer.innerHTML = `
            <div class="map-fallback">
                <i class="fas fa-map-marker-alt"></i>
                <h3>Lunar Estates Phase 1</h3>
                <p>Jupiter Street, Brownsville, TX 78521</p>
                <p>Interactive map temporarily unavailable</p>
                <a href="Lunar Estates Phase I CCRs.PDF" class="fallback-download" download>
                    <i class="fas fa-download"></i>
                    Download Deed Restrictions
                </a>
            </div>
        `;
    }
}

function setupScrollEffects() {
    const navbar = document.querySelector('.navbar');
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        if (navbar) {
            navbar.classList.toggle('scrolled', scrollY > 50);
        }
        
        if (backToTopBtn) {
            backToTopBtn.classList.toggle('show', scrollY > 300);
        }
    });
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

function addMapStyles() {
    if (document.getElementById('map-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'map-styles';
    style.textContent = `
        .custom-marker {
            background: none;
            border: none;
        }
        
        .marker-pin {
            width: 40px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #c1743c;
            font-size: 32px;
            text-shadow: 0 4px 12px rgba(0,0,0,0.4);
            filter: drop-shadow(0 2px 8px rgba(193, 116, 60, 0.3));
            animation: bounce 2s infinite;
            position: relative;
        }
        
        .marker-pin::before {
            content: '';
            position: absolute;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(193, 116, 60, 0.3), transparent);
            border-radius: 50%;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            animation: pulse 2s infinite;
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-12px); }
            60% { transform: translateY(-6px); }
        }
        
        @keyframes pulse {
            0%, 100% {
                opacity: 0.4;
                transform: translateX(-50%) scale(1);
            }
            50% {
                opacity: 0.8;
                transform: translateX(-50%) scale(1.2);
            }
        }
        
        .custom-popup .leaflet-popup-content-wrapper {
            background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.15), 0 8px 25px rgba(0,0,0,0.1);
            border: none;
            padding: 0;
            overflow: hidden;
            backdrop-filter: blur(10px);
        }
        
        .custom-popup .leaflet-popup-tip {
            background: linear-gradient(135deg, #c1743c, #d4925a);
            width: 20px;
            height: 20px;
            border: none;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        
        .custom-popup .leaflet-popup-content {
            margin: 0;
            padding: 0;
            width: auto !important;
        }
        
        .map-popup {
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .popup-header {
            background: linear-gradient(135deg, #c1743c, #d4925a);
            padding: 20px 24px 16px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .popup-header h3 {
            color: #ffffff;
            margin: 0 0 8px 0;
            font-size: 18px;
            font-weight: 700;
            letter-spacing: -0.5px;
            position: relative;
            z-index: 1;
        }
        
        .popup-badge {
            background: rgba(255, 255, 255, 0.2);
            color: #ffffff;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            display: inline-block;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            position: relative;
            z-index: 1;
        }
        
        .popup-details {
            padding: 20px 24px 16px;
        }
        
        .detail-item {
            display: flex;
            align-items: center;
            margin-bottom: 12px;
            font-size: 14px;
            color: #2c3e50;
        }
        
        .detail-item:last-child {
            margin-bottom: 0;
        }
        
        .detail-item i {
            color: #c1743c;
            margin-right: 12px;
            width: 16px;
            text-align: center;
            font-size: 14px;
        }
        
        .detail-item span {
            font-weight: 500;
            line-height: 1.4;
        }
        
        .popup-download {
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #2c3e50, #34495e);
            color: #ffffff;
            padding: 16px 24px;
            text-decoration: none;
            font-size: 14px;
            font-weight: 600;
            margin: 0;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .popup-download::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
            transition: left 0.5s ease;
        }
        
        .popup-download:hover::before {
            left: 100%;
        }
        
        .popup-download:hover {
            background: linear-gradient(135deg, #34495e, #2c3e50);
            color: #ffffff;
            transform: translateY(-1px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.2);
        }
        
        .popup-download i {
            margin-right: 8px;
            font-size: 14px;
        }
        
        .map-fallback {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            min-height: 400px;
            text-align: center;
            color: #666;
            background: linear-gradient(135deg, #f8f9fa, #e9ecef);
            padding: 40px 20px;
        }
        
        .map-fallback i {
            font-size: 64px;
            color: #c1743c;
            margin-bottom: 24px;
            filter: drop-shadow(0 4px 12px rgba(193, 116, 60, 0.2));
        }
        
        .map-fallback h3 {
            color: #2c3e50;
            margin: 0 0 12px 0;
            font-size: 20px;
            font-weight: 600;
        }
        
        .map-fallback p {
            margin: 6px 0;
            font-size: 14px;
            color: #666;
            line-height: 1.5;
        }
        
        .fallback-download {
            display: inline-flex;
            align-items: center;
            background: #c1743c;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            margin-top: 20px;
            transition: all 0.3s ease;
        }
        
        .fallback-download:hover {
            background: #a85e2d;
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(193, 116, 60, 0.3);
        }
        
        .fallback-download i {
            margin-right: 8px;
        }
    `;
    
    document.head.appendChild(style);
}
