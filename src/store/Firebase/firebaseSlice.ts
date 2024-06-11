import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FirebaseState {
  data: any[];
  loading: boolean;
  error: string | null;
}

const initialState: FirebaseState = {
  data: [],
  loading: false,
  error: null,
};

const firebaseSlice = createSlice({
  name: 'firebase',
  initialState,
  reducers: {
    fetchDataSuccess(state, action: PayloadAction<any[]>) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDataSuccess, fetchDataFailure } =
  firebaseSlice.actions;
export default firebaseSlice.reducer;
