import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Jobs, FirebaseResponseInterface, Company } from 'src/types';

interface FirebaseState {
  data: FirebaseResponseInterface;
  loading: boolean;
  error: string | null;
}

const initialState: FirebaseState = {
  data: {joblist: [], companiesList: []},
  loading: false,
  error: null,
};

const firebaseSlice = createSlice({
  name: 'firebase',
  initialState,
  reducers: {
    fetchCompanies(state) {
      state.loading = true;
    },
    fetchCompaniesSuccess(state, action: PayloadAction<Company[]>){
      state.loading = false;
      state.data.companiesList = action.payload;
    },
    fetchCompaniesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchData(state) {
      state.loading = true;
    },
    fetchDataSuccess(state, action: PayloadAction<Jobs[]>) {
      state.loading = false;
      state.data.joblist = action.payload;
    },
    fetchDataFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchCompanies, fetchData, fetchDataSuccess, fetchDataFailure, fetchCompaniesFailure, fetchCompaniesSuccess } =
  firebaseSlice.actions;
export default firebaseSlice.reducer;
