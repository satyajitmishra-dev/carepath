import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const analyzeSymptoms = createAsyncThunk(
  'analysis/analyze',
  async (symptomText, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/analyze', { symptoms: symptomText });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to analyze symptoms. Please try again.'
      );
    }
  }
);

const initialState = {
  result: null,
  isLoading: false,
  error: null,
  activeScreen: 'home', // 'home' | 'loading' | 'results'
};

const analysisSlice = createSlice({
  name: 'analysis',
  initialState,
  reducers: {
    setActiveScreen: (state, action) => {
      state.activeScreen = action.payload;
    },
    clearResults: (state) => {
      state.result = null;
      state.error = null;
      state.activeScreen = 'home';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(analyzeSymptoms.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.activeScreen = 'loading';
      })
      .addCase(analyzeSymptoms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.result = action.payload;
        state.activeScreen = 'results';
      })
      .addCase(analyzeSymptoms.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.activeScreen = 'home';
      });
  },
});

export const { setActiveScreen, clearResults } = analysisSlice.actions;
export default analysisSlice.reducer;
