// src/features/user/userSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(state, action) {
      state.name = action.payload.name;
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
