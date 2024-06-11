import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TabState {
  name: string;
  loading: boolean;
}

const initialState: TabState = {
  loading: false,
  name: 'First tab',
};

const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    setTabName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setTabNameSuccess(state) {
      state.loading = false;
    },
    setTabNameFailure(state) {
      state.loading = false;
    },
  },
});

export const { setTabName, setTabNameFailure, setTabNameSuccess } =
  tabSlice.actions;
export default tabSlice.reducer;
