import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lat: 22.5726,
  lng: 88.3639,
  source: 'default',
  error: null,
  isDetecting: false,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
      state.source = action.payload.source || 'gps';
      state.error = null;
      state.isDetecting = false;
    },
    setLocationError: (state, action) => {
      state.error = action.payload;
      state.isDetecting = false;
    },
    setDetecting: (state, action) => {
      state.isDetecting = action.payload;
    },
  },
});

export const { setLocation, setLocationError, setDetecting } = locationSlice.actions;
export default locationSlice.reducer;
