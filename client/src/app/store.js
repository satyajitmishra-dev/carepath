import { configureStore } from '@reduxjs/toolkit';
import symptomsReducer from '../features/symptoms/symptomsSlice';
import analysisReducer from '../features/analysis/analysisSlice';
import mapReducer from '../features/map/mapSlice';
import locationReducer from '../features/location/locationSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    symptoms: symptomsReducer,
    analysis: analysisReducer,
    map: mapReducer,
    location: locationReducer,
    auth: authReducer,
  },
});

export default store;
