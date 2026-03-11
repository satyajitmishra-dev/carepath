import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  clinics: [],
  filteredClinics: [],
  affordableOnly: false,
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setClinics: (state, action) => {
      state.clinics = action.payload;
      state.filteredClinics = state.affordableOnly
        ? action.payload.filter((c) => c.affordable)
        : action.payload;
    },
    toggleAffordable: (state) => {
      state.affordableOnly = !state.affordableOnly;
      state.filteredClinics = state.affordableOnly
        ? state.clinics.filter((c) => c.affordable)
        : state.clinics;
    },
    clearClinics: (state) => {
      state.clinics = [];
      state.filteredClinics = [];
      state.affordableOnly = false;
    },
  },
});

export const { setClinics, toggleAffordable, clearClinics } = mapSlice.actions;
export default mapSlice.reducer;
