import { motion } from 'framer-motion';
import { Star, MapPin, Clock, Phone, Navigation, BadgeCheck, IndianRupee } from 'lucide-react';
import { getDirectionsUrl } from '../../utils/haversine';

export default function ClinicCard({ clinic, userLat, userLng, index }) {
  const directionsUrl = getDirectionsUrl(userLat, userLng, clinic.lat, clinic.lng);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, type: 'spring', stiffness: 200, damping: 25 }}
      whileHover={{ y: -3 }}
      className="glass-card p-5 card-hover group"
      id={`clinic-card-${clinic.id}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        {/* Left: Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <h4 className="font-bold text-[#E8F8F2] text-base truncate">{clinic.name}</h4>
              <p className="text-emerald-100/50 text-xs mt-0.5">{clinic.clinicName}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-50 border border-amber-100 shrink-0">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              <span className="text-amber-700 text-xs font-bold">{clinic.rating}</span>
            </div>
          </div>

          {/* Tags row */}
          <div className="flex flex-wrap items-center gap-2 mt-3">
            {/* Specialty badge */}
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-900/40 text-emerald-300 text-[11px] font-semibold border border-emerald-500/20">
              {clinic.specialty}
            </span>

            {/* Fee badge */}
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-[11px] font-semibold border border-blue-100">
              <IndianRupee className="w-3 h-3" />
              {clinic.feeDisplay}
            </span>

            {/* Affordable badge */}
            {clinic.affordable && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-green-50 text-green-700 text-[11px] font-semibold border border-green-100"
              >
                <BadgeCheck className="w-3 h-3" />
                Affordable
              </motion.span>
            )}

            {/* Distance */}
            {clinic.distance !== undefined && (
              <span className="inline-flex items-center gap-1 text-emerald-100/50 text-[11px]">
                <MapPin className="w-3 h-3" />
                {clinic.distance} km
              </span>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-wrap items-center gap-4 mt-3 text-[11px] text-emerald-100/40">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {clinic.timing}
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" /> {clinic.phone}
            </span>
          </div>
          <p className="text-[11px] text-emerald-100/40 mt-1.5">{clinic.address}</p>
        </div>

        {/* Right: Directions button */}
        <div className="flex sm:flex-col gap-2 sm:items-end shrink-0">
          <motion.a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="btn-ripple gradient-primary text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-md shadow-emerald-500/15 no-underline"
          >
            <Navigation className="w-3.5 h-3.5" />
            Get Directions
          </motion.a>

          <a
            href={`tel:${clinic.phone}`}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-emerald-300 bg-emerald-900/40 border border-emerald-500/20 hover:bg-emerald-100 transition-colors no-underline"
          >
            <Phone className="w-3 h-3" />
            Call
          </a>
        </div>
      </div>
    </motion.div>
  );
}
