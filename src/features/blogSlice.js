import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: [],
    userBlogs: [],
    blogsCount: 0,
    filteredBlogs: 0,
    blog: {},
  },
  reducers: {
    setBlogs: (state, action) => {
      state.blogs = action.payload.blogs;
      state.blogsCount = action.payload.blogsCount;
      state.filteredBlogs = action.payload.filteredBlogs;
    },
    setUserBlogs: (state, action) => {
      state.userBlogs = action.payload.userBlogs;
    },
    setBlog: (state, action) => {
      state.blog = action.payload.blog;
    },
  },
});

export const { setBlogs, setUserBlogs, setBlog } = blogSlice.actions;
export default blogSlice.reducer;
