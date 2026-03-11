import { useSelector } from 'react-redux';
import ClinicCard from '../../components/ui/ClinicCard';

export default function ClinicList() {
  const { filteredClinics } = useSelector((state) => state.map);
  const { lat, lng } = useSelector((state) => state.location);

  if (filteredClinics.length === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <p className="text-emerald-100/50 text-sm">No clinics found matching your criteria.</p>
        <p className="text-emerald-100/40 text-xs mt-1">Try toggling the affordable filter off.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-emerald-100/50 uppercase tracking-wider">
          Nearby Clinics ({filteredClinics.length})
        </h3>
        <span className="text-[11px] text-emerald-100/40">Sorted by distance</span>
      </div>

      {filteredClinics.map((clinic, i) => (
        <ClinicCard
          key={clinic.id}
          clinic={clinic}
          userLat={lat}
          userLng={lng}
          index={i}
        />
      ))}
    </div>
  );
}
