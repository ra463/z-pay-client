import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import "../components/styles/Home.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserBlogs } from "../features/apiCall";
import PulseLoader from "react-spinners/PulseLoader";
import Footer from "../components/Footer/Footer";

const MyBlog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userBlogs } = useSelector((state) => state.blog);
  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserBlogs(dispatch, setLoading, token);
  }, [setLoading, dispatch, token]);
  return (
    <>
      <Header />
      <div className="home_blogs">
        <div className="blogs">
          <span onClick={() => navigate("/")}>All Blogs</span>
          <span className="active">My Blogs</span>
        </div>
        <div
          className={`all_blogs ${
            userBlogs && userBlogs.length > 0 ? "" : "em_blogs"
          }`}
        >
          {loading ? (
            <div className="loader">
              <PulseLoader size={15} color="#36d7b7" />
            </div>
          ) : (
            <>
              {userBlogs && userBlogs.length > 0 ? (
                userBlogs.map((blog, i) => (
                  <div key={i} className="blog">
                    <img src={blog.images[0].url} alt="blog" />
                    <div className="details">
                      <span className="tag">{blog?.genure}</span>
                      <h3>{blog.title}</h3>
                      <p>{blog.description.slice(0, 100).concat("...")}</p>
                      <span
                        onClick={() => navigate(`/blog/${blog._id}`)}
                        className="read_more"
                      >
                        Read More
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no_blogs">No blogs Found</div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyBlog;
