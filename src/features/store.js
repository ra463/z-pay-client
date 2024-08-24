import { configureStore } from "@reduxjs/toolkit";
import blogSlice from "./blogSlice";
import commentSlice from "./commentSlice";
import authSlice from "./authSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    blog: blogSlice,
    comment: commentSlice,
  },
});
