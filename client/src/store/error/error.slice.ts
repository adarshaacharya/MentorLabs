import { createSlice } from '@reduxjs/toolkit';

const errorSlice = createSlice({
  name: 'error',
  initialState: {
    message: null,
  },
  reducers: {
    setError: (state, action) => {
      state.message = action.payload;
    },
    clearErrror: (state) => {
      state.message = null;
    },
  },
});

export const { setError, clearErrror } = errorSlice.actions;

export default errorSlice.reducer;
