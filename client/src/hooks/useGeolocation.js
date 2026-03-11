import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation, setLocationError, setDetecting } from '../features/location/locationSlice';

export function useGeolocation() {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.location);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      dispatch(setLocationError('Geolocation is not supported by your browser'));
      return;
    }

    dispatch(setDetecting(true));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch(
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            source: 'gps',
          })
        );
      },
      (error) => {
        let message = 'Could not detect location. Using default.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = 'Location access denied. Showing results for Kolkata city center.';
            break;
          case error.POSITION_UNAVAILABLE:
            message = 'Could not detect location. Using default.';
            break;
          case error.TIMEOUT:
            message = 'Location request timed out. Using default location.';
            break;
        }
        dispatch(setLocationError(message));
        // Set default Kolkata location
        dispatch(
          setLocation({
            lat: 22.5726,
            lng: 88.3639,
            source: 'default',
          })
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  return { ...location, detectLocation };
}
