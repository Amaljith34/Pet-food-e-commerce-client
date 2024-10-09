import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogged: false,
  UserId: null,
};

const loginSlice = createSlice({
  name: "logSlice",
  initialState,
  reducers: {
    login: (state, action) => {
      if (action.payload && action.payload.id) {
        state.isLogged = true;
        state.UserId = action.payload.id;
      }
    },
    logout: (state) => {
      state.isLogged = false;
      state.UserId = null;
    },
  },
});

export default loginSlice.reducer;
export const { login, logout } = loginSlice.actions;
