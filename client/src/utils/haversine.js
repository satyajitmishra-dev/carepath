/**
 * Calculate the distance between two GPS coordinates using the Haversine formula.
 * @returns Distance in kilometers
 */
export function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10; // Round to 1 decimal
}

/**
 * Build Google Maps directions URL
 */
export function getDirectionsUrl(userLat, userLng, clinicLat, clinicLng) {
  return `https://www.google.com/maps/dir/${userLat},${userLng}/${clinicLat},${clinicLng}`;
}

/**
 * Validate symptom input
 */
export function validateSymptomInput(text) {
  if (!text || !text.trim()) {
    return { valid: false, error: 'Please describe at least one symptom' };
  }
  if (text.trim().length < 3) {
    return { valid: false, error: 'Please enter at least 3 characters' };
  }
  if (text.length > 500) {
    return { valid: false, error: 'Input cannot exceed 500 characters' };
  }
  // Check for phone numbers, emails, URLs
  const phoneRegex = /(\+?\d[\d\s-]{7,})/;
  const emailRegex = /[\w.-]+@[\w.-]+\.\w+/;
  const urlRegex = /https?:\/\/[^\s]+/;
  if (phoneRegex.test(text) || emailRegex.test(text) || urlRegex.test(text)) {
    return { valid: false, error: 'Please enter only symptom descriptions' };
  }
  return { valid: true, error: null };
}

/**
 * Parse symptom text into individual chips
 */
export function parseSymptoms(text) {
  return text
    .split(/[,;]+/)
    .map((s) => s.trim().toLowerCase())
    .filter((s) => s.length > 1);
}
