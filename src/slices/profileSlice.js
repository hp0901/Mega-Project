// profileSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,  // add this
};


const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearProfile(state) {
      state.user = null;
    },
    setLoading(state, value) {
       state.loading = value.payload;
    },
  },
});

export const { setUser, clearProfile, setLoading } = profileSlice.actions;
export default profileSlice.reducer;
