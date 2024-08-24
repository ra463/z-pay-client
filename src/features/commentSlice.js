import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: [],
  },
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload.comments;
    },
  },
});

export const { setComments } = commentSlice.actions;
export default commentSlice.reducer;
