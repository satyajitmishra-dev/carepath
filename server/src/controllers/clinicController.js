import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load mock clinics data
let clinicsData = [];
try {
  const dataPath = join(__dirname, '..', 'data', 'clinics.json');
  clinicsData = JSON.parse(readFileSync(dataPath, 'utf-8'));
} catch (err) {
  console.error('Failed to load clinics data:', err.message);
}

export function getClinics(req, res) {
  const { specialty, lat, lng } = req.query;

  let filtered = [...clinicsData];

  // Filter by specialty
  if (specialty) {
    filtered = filtered.filter(
      (c) => c.specialty.toLowerCase() === specialty.toLowerCase()
    );
  }

  // Calculate distance if lat/lng provided
  if (lat && lng) {
    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);

    filtered = filtered.map((c) => ({
      ...c,
      distance: getDistance(userLat, userLng, c.lat, c.lng),
    }));

    // Sort by distance
    filtered.sort((a, b) => a.distance - b.distance);
  }

  return res.json({
    success: true,
    count: filtered.length,
    clinics: filtered,
  });
}

function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}
