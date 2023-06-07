// Redux
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: {
    token: null,
    expiration: null,
  },
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setToken(state, action) {
      return { ...state, token: action.payload };
    },
    setIsLoggedIn(state, action) {
      return { ...state, isLoggedIn: action.payload };
    },
    resetAuth: () => initialState,
  },
});

export const { setToken, setIsLoggedIn, resetAuth } = authSlice.actions;
export default authSlice.reducer;
