import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getBlog, getComments } from "../features/apiCall";
import moment from "moment";
import "../components/styles/Blog.scss";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosUtils";
import { MdDelete, MdEdit } from "react-icons/md";
import Footer from "../components/Footer/Footer";
import PulseLoader from "react-spinners/PulseLoader";
import UpdateBlog from "../components/layout/UpdateBlog";

const Blog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const param = useParams();

  const { blog } = useSelector((state) => state.blog);
  const { token, id: userId } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => state.comment);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  const [showUpdateBlog, setShowUpdateBlog] = useState(false);

  const { id } = param;

  const handleComment = async (e) => {
    e.preventDefault();
    if (!text) return toast.error("Please enter text");
    if (!token) return toast.error("Please login to comment");
    try {
      const { data } = await axiosInstance.post(
        `/api/comment/add-comment/${id}`,
        { text },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getComments(dispatch, setCommentLoading, id);
        setText("");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?"))
      return;
    try {
      const { data } = await axiosInstance.delete(
        `/api/comment/delete-comment/${commentId}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getComments(dispatch, setCommentLoading, id);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleDelete = async (id) => {
    if (!token) return toast.error("Please login to delete the blog");
    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;

    try {
      setDelLoading(true);
      const { data } = await axiosInstance.delete(
        `/api/blog/delete-blog/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        setDelLoading(false);
        toast.success(data.message);
        navigate("/my-blog");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getBlog(dispatch, setLoading, id);
  }, [setLoading, dispatch, id]);

  useEffect(() => {
    getComments(dispatch, setCommentLoading, id);
  }, [setLoading, dispatch, id]);

  return (
    <>
      <Header />
      {loading ? (
        <div className="loader">
          <PulseLoader size={15} color="#36d7b7" />
        </div>
      ) : (
        <div className="blog_details">
          <div className="blog">
            <span className="genure">{blog?.genure}</span>
            <h1 className="title">{blog?.title}</h1>
            <div className="date">
              <div>
                <span>Published</span>
                <span>{moment(blog?.createdAt).fromNow()}</span>
              </div>
              <div>
                <span>Author</span>
                <span>{blog?.user?.name}</span>
              </div>
              {token && blog?.user?._id === userId && (
                <div className="btns">
                  <button onClick={() => setShowUpdateBlog(true)}>
                    <MdEdit />
                    Edit
                  </button>
                  <button
                    disabled={delLoading}
                    onClick={() => handleDelete(blog._id)}
                  >
                    {delLoading ? (
                      <PulseLoader size={5} color="#fff" />
                    ) : (
                      <span>
                        <MdDelete />
                        Delete
                      </span>
                    )}
                  </button>
                </div>
              )}
            </div>
            <div className="img">
              {blog &&
                blog?.images?.length > 0 &&
                blog?.images.map((image, i) => (
                  <img
                    key={i}
                    src={image.url}
                    alt="blog"
                    className="blog_image"
                  />
                ))}
            </div>
            <div className="desc">
              <h2>Content</h2>
              {blog?.description}
            </div>
            <div className="add_comment">
              <span>Add Comment</span>
              <form onSubmit={handleComment} className="input_comment">
                <input
                  type="text"
                  required
                  rows="2"
                  cols="50"
                  placeholder="Write your comment..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <button type="submit">Comment</button>
              </form>
            </div>
            <div className="all_comments">
              <span className="head">All Comments</span>
              {commentLoading && <div className="loader"></div>}
              <div className="comments">
                {comments && comments?.length > 0 ? (
                  comments?.map((comment, i) => (
                    <div className="comment_box" key={i}>
                      <div className="comment">
                        <img
                          src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                          alt="user"
                        />
                        <div className="content">
                          <div className="name">
                            <span className="user_name">
                              {comment?.user?.name}
                            </span>
                            <span className="date">
                              {moment(comment?.createdAt).fromNow()}
                            </span>
                          </div>
                          <span className="comment_text">{comment?.text}</span>
                        </div>
                      </div>
                      {token && userId === comment?.user?._id && (
                        <MdDelete
                          onClick={() => handleDeleteComment(comment?._id)}
                          style={{ cursor: "pointer" }}
                        />
                      )}
                    </div>
                  ))
                ) : (
                  <div className="no_comments">Be the first to comment !!</div>
                )}
              </div>
            </div>
          </div>
          {showUpdateBlog && (
            <UpdateBlog setShowUpdateBlog={setShowUpdateBlog} id={blog._id} />
          )}
        </div>
      )}
      <Footer />
    </>
  );
};

export default Blog;
