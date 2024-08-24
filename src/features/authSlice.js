import { createSlice } from "@reduxjs/toolkit";
const token = localStorage.getItem("token");
const email = localStorage.getItem("email");
const name = localStorage.getItem("name");
const id = localStorage.getItem("id");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: token,
    name: name,
    email: email,
    id: id,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.id = action.payload.id;
    },
    removeToken: (state, action) => {
      state.token = null;
      state.email = null;
      state.name = null;
      state.id = null;
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;
export default authSlice.reducer;
