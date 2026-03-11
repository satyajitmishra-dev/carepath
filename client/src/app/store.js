import { configureStore } from '@reduxjs/toolkit';
import symptomsReducer from '../features/symptoms/symptomsSlice';
import analysisReducer from '../features/analysis/analysisSlice';
import mapReducer from '../features/map/mapSlice';
import locationReducer from '../features/location/locationSlice';

export const store = configureStore({
  reducer: {
    symptoms: symptomsReducer,
    analysis: analysisReducer,
    map: mapReducer,
    location: locationReducer,
  },
});

export default store;
