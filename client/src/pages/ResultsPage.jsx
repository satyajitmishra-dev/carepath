import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Tag } from 'lucide-react';
import UrgencyBadge from '../components/ui/UrgencyBadge';
import DisclaimerBanner from '../components/ui/DisclaimerBanner';
import CareJourneyTimeline from '../components/ui/CareJourneyTimeline';
import ConditionCards from '../features/analysis/ConditionCards';
import SpecialistCard from '../features/analysis/SpecialistCard';
import ClinicMap from '../features/map/ClinicMap';
import ClinicList from '../features/map/ClinicList';
import AffordableFilter from '../features/map/AffordableFilter';
import { setClinics } from '../features/map/mapSlice';
import { clearResults } from '../features/analysis/analysisSlice';
import { clearSymptoms } from '../features/symptoms/symptomsSlice';
import { clearClinics } from '../features/map/mapSlice';
import { getDistance } from '../utils/haversine';
import allClinics from '../data/clinics.json';

export default function ResultsPage() {
  const dispatch = useDispatch();
  const { result } = useSelector((state) => state.analysis);
  const { symptomChips } = useSelector((state) => state.symptoms);
  const { lat, lng } = useSelector((state) => state.location);

  // Filter clinics by specialty and calculate distance
  useEffect(() => {
    if (result?.specialistType) {
      const matched = allClinics
        .filter(
          (c) =>
            c.specialty.toLowerCase() === result.specialistType.toLowerCase()
        )
        .map((c) => ({
          ...c,
          distance: getDistance(lat, lng, c.lat, c.lng),
        }))
        .sort((a, b) => a.distance - b.distance);

      dispatch(setClinics(matched));
    }
  }, [result, lat, lng, dispatch]);

  const handleBack = () => {
    dispatch(clearResults());
    dispatch(clearSymptoms());
    dispatch(clearClinics());
  };

  if (!result) return null;

  return (
    <div className="relative min-h-[calc(100vh-5rem)]">
      <div className="absolute inset-0 gradient-mesh" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-8">
        {/* Back button + symptom tags */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"
        >
          <motion.button
            onClick={handleBack}
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 text-sm font-medium text-teal hover:text-evergreen transition-colors cursor-pointer bg-transparent border-none"
          >
            <ArrowLeft className="w-4 h-4" />
            New Search
          </motion.button>

          {symptomChips.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-3.5 h-3.5 text-gray-400" />
              {symptomChips.map((chip) => (
                <span
                  key={chip}
                  className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/80 border border-emerald-100 text-teal"
                >
                  {chip}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* Results grid */}
        <div className="flex flex-col gap-5 stagger-in">
          {/* Urgency badge */}
          <UrgencyBadge level={result.urgencyLevel} reason={result.urgencyReason} />

          {/* Specialist card */}
          <SpecialistCard
            specialistType={result.specialistType}
            searchQuery={result.searchQuery}
          />

          <CareJourneyTimeline
            urgencyLevel={result.urgencyLevel}
            specialistType={result.specialistType}
          />

          {/* Conditions */}
          <ConditionCards conditions={result.possibleConditions} />

          {/* Map section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-teal" />
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Nearby {result.specialistType}s
              </h3>
            </div>

            <AffordableFilter />
            <ClinicMap />
          </div>

          {/* Clinic list */}
          <ClinicList />

          {/* Disclaimer */}
          <DisclaimerBanner disclaimer={result.disclaimer} />
        </div>
      </div>
    </div>
  );
}
