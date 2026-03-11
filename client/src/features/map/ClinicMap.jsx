import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useSelector } from 'react-redux';
import { getDirectionsUrl } from '../../utils/haversine';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom user icon (green pulsing dot)
const userIcon = L.divIcon({
  className: '',
  html: `<div style="
    width: 18px; height: 18px;
    background: #50C878;
    border: 3px solid white;
    border-radius: 50%;
    box-shadow: 0 0 0 0 rgba(80,200,120,0.5), 0 2px 8px rgba(0,0,0,0.2);
    animation: userPulse 2s ease-out infinite;
  "></div>
  <style>
    @keyframes userPulse {
      0% { box-shadow: 0 0 0 0 rgba(80,200,120,0.5), 0 2px 8px rgba(0,0,0,0.2); }
      70% { box-shadow: 0 0 0 20px rgba(80,200,120,0), 0 2px 8px rgba(0,0,0,0.2); }
      100% { box-shadow: 0 0 0 0 rgba(80,200,120,0), 0 2px 8px rgba(0,0,0,0.2); }
    }
  </style>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

// Custom clinic icon
const clinicIcon = L.divIcon({
  className: '',
  html: `<div style="
    width: 32px; height: 32px;
    background: linear-gradient(135deg, #0B6E4F, #013220);
    border: 2px solid white;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    box-shadow: 0 3px 10px rgba(0,0,0,0.2);
    display: flex; align-items: center; justify-content: center;
  ">
    <span style="transform: rotate(45deg); color: white; font-size: 14px; font-weight: bold;">+</span>
  </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Component to handle map center
function MapCenterUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 13, { animate: true });
    }
  }, [center, map]);
  return null;
}

export default function ClinicMap() {
  const { lat, lng } = useSelector((state) => state.location);
  const { filteredClinics } = useSelector((state) => state.map);

  return (
    <div className="w-full h-[400px] sm:h-[450px] rounded-2xl overflow-hidden shadow-lg border border-emerald-500/20/50">
      <MapContainer
        center={[lat, lng]}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full"
        style={{ borderRadius: '1rem' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          maxZoom={18}
        />

        <MapCenterUpdater center={[lat, lng]} />

        {/* User marker */}
        <Marker position={[lat, lng]} icon={userIcon}>
          <Popup>
            <div className="text-center p-1">
              <p className="font-bold text-sm text-[#E8F8F2]">📍 Your Location</p>
              <p className="text-xs text-emerald-100/50 mt-0.5">{lat.toFixed(4)}, {lng.toFixed(4)}</p>
            </div>
          </Popup>
        </Marker>

        {/* Clinic markers */}
        {filteredClinics.map((clinic) => (
          <Marker
            key={clinic.id}
            position={[clinic.lat, clinic.lng]}
            icon={clinicIcon}
          >
            <Popup maxWidth={260}>
              <div className="p-1 min-w-[200px]">
                <h4 className="font-bold text-sm text-[#E8F8F2] mb-0.5">{clinic.name}</h4>
                <p className="text-[11px] text-emerald-100/50 mb-2">{clinic.clinicName}</p>

                <div className="flex flex-wrap gap-1.5 mb-2">
                  <span className="px-2 py-0.5 bg-emerald-900/40 text-emerald-300 text-[10px] font-semibold rounded-full">
                    {clinic.specialty}
                  </span>
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-semibold rounded-full">
                    {clinic.feeDisplay}
                  </span>
                  <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-[10px] font-semibold rounded-full">
                    ⭐ {clinic.rating}
                  </span>
                </div>

                {clinic.distance !== undefined && (
                  <p className="text-[11px] text-emerald-100/50 mb-2">📏 {clinic.distance} km away</p>
                )}

                <a
                  href={getDirectionsUrl(lat, lng, clinic.lat, clinic.lng)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '6px 12px',
                    background: 'linear-gradient(135deg, #50C878, #0B6E4F)',
                    color: 'white',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    width: '100%',
                    justifyContent: 'center',
                  }}
                >
                  🧭 Get Directions
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
