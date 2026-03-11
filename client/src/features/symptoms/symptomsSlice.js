import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  symptomText: '',
  symptomChips: [],
  error: null,
};

const symptomsSlice = createSlice({
  name: 'symptoms',
  initialState,
  reducers: {
    setSymptomText: (state, action) => {
      state.symptomText = action.payload;
    },
    addChip: (state, action) => {
      const chip = action.payload.trim().toLowerCase();
      if (chip && !state.symptomChips.includes(chip)) {
        state.symptomChips.push(chip);
      }
    },
    removeChip: (state, action) => {
      state.symptomChips = state.symptomChips.filter((_, i) => i !== action.payload);
    },
    setChips: (state, action) => {
      state.symptomChips = action.payload;
    },
    clearSymptoms: (state) => {
      state.symptomText = '';
      state.symptomChips = [];
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setSymptomText, addChip, removeChip, setChips, clearSymptoms, setError } = symptomsSlice.actions;
export default symptomsSlice.reducer;
