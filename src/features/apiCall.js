import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosUtils";
import { setBlog, setBlogs, setUserBlogs } from "./blogSlice";
import { setComments } from "./commentSlice";

export const getAllBlogs = async (
  dispatch,
  setLoading,
  search,
  genure,
  resultPerPage,
  currentPage
) => {
  try {
    setLoading(true);
    const { data } = await axiosInstance.get(
      `/api/blog/get-all-blogs?title=${search}&genure=${genure}&resultPerPage=${resultPerPage}&currentPage=${currentPage}`
    );

    if (data.success) {
      setLoading(false);
      dispatch(
        setBlogs({
          blogs: data.blogs,
          blogsCount: data.blogsCount,
          filteredBlogs: data.filteredBlogs,
        })
      );
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
};

export const getUserBlogs = async (dispatch, setLoading, token) => {
  try {
    setLoading(true);
    const { data } = await axiosInstance.get(`/api/blog/get-user-blogs`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (data.success) {
      setLoading(false);
      dispatch(
        setUserBlogs({
          userBlogs: data.blogs,
        })
      );
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
};

export const getBlog = async (dispatch, setLoading, id) => {
  try {
    setLoading(true);
    const { data } = await axiosInstance.get(`/api/blog/get-blog/${id}`);

    if (data.success) {
      setLoading(false);
      dispatch(
        setBlog({
          blog: data.blog,
        })
      );
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
};

export const getComments = async (dispatch, setCommentLoading, id) => {
  try {
    setCommentLoading(true);
    const { data } = await axiosInstance.get(`/api/comment/get-comments/${id}`);

    if (data.success) {
      setCommentLoading(false);
      dispatch(
        setComments({
          comments: data.comments,
        })
      );
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
};
