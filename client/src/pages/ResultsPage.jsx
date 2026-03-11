import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Tag, DownloadCloud } from 'lucide-react';
import UrgencyBadge from '../components/ui/UrgencyBadge';
import DisclaimerBanner from '../components/ui/DisclaimerBanner';
import CareJourneyTimeline from '../components/ui/CareJourneyTimeline';
import ConditionCards from '../features/analysis/ConditionCards';
import SpecialistCard from '../features/analysis/SpecialistCard';
import ClinicMap from '../features/map/ClinicMap';
import ClinicList from '../features/map/ClinicList';
import AffordableFilter from '../features/map/AffordableFilter';
import PostVisitFeedback from '../components/ui/PostVisitFeedback';
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

  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    try {
      setIsDownloading(true);
      const element = document.getElementById('results-content-area');
      
      // Temporarily give the element a highly visible styling context for PDF
      const originalBg = element.style.backgroundColor;
      const originalP = element.style.padding;
      
      element.style.backgroundColor = '#07100C'; // Match the app's dark background
      element.style.padding = '20px';
      
      const opt = {
        margin: 10,
        filename: `carepath-results-${new Date().getTime()}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#07100C',
          windowWidth: element.scrollWidth,
          windowHeight: element.scrollHeight,
          ignoreElements: (el) => {
            // Ignore problematic daisyUI oklab/oklch elements if they exist or hidden interactive maps
            return el.classList && el.classList.contains('leaflet-control-container');
          },
          onclone: (clonedDoc) => {
             // html2canvas struggles with oklab/oklch. Clean out DaisyUI/tailwind root variables that use oklab
             const rootelem = clonedDoc.documentElement;
             if (rootelem) {
                 rootelem.removeAttribute('data-theme');
             }
          }
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      // Import dynamically to avoid Vite SSR / missing default export issues
      const html2pdf = (await import('html2pdf.js')).default;
      await html2pdf().set(opt).from(element).save();

      element.style.backgroundColor = originalBg;
      element.style.padding = originalP;
    } catch (error) {
      console.error('PDF Download failed:', error);
      alert('Could not download PDF. Please try again or print the page directly.');
    } finally {
      setIsDownloading(false);
    }
  };

  if (!result) return null;

  return (
    <div className="relative min-h-[calc(100vh-5rem)]">
      <div className="absolute inset-0 gradient-mesh" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-8">
        {/* Header: Back button + Download + symptom tags */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"
        >
          <div className="flex items-center gap-4">
            <motion.button
              onClick={handleBack}
              whileHover={{ x: -3 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 text-sm font-medium text-emerald-300 hover:text-[#E8F8F2] transition-colors cursor-pointer bg-transparent border-none"
            >
              <ArrowLeft className="w-4 h-4" />
              New Search
            </motion.button>

            <div className="w-px h-4 bg-emerald-200 hidden sm:block" />

            <motion.button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-400 hover:bg-emerald-200 transition-colors cursor-pointer border border-emerald-300/50 disabled:opacity-50"
            >
              <DownloadCloud className="w-4 h-4" />
              {isDownloading ? 'Saving...' : 'Save as PDF'}
            </motion.button>
          </div>

          {symptomChips.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-3.5 h-3.5 text-emerald-100/40" />
              {symptomChips.map((chip) => (
                <span
                  key={chip}
                  className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#0A140F]/80 border border-emerald-500/20 text-emerald-300"
                >
                  {chip}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* Results grid (Print Area) */}
        <div id="results-content-area" className="flex flex-col gap-5 stagger-in bg-[#F4FAF7] sm:bg-transparent rounded-2xl sm:rounded-none">
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
              <MapPin className="w-4 h-4 text-emerald-300" />
              <h3 className="text-sm font-semibold text-emerald-100/50 uppercase tracking-wider">
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

        {/* Feedback Section */}
        <PostVisitFeedback />
      </div>
    </div>
  );
}
