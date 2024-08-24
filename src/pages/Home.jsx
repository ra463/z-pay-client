import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import "../components/styles/Home.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/apiCall";
import CustomPagination from "../utils/CustomPagination";
import Footer from "../components/Footer/Footer";
import PulseLoader from "react-spinners/PulseLoader";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { blogs, blogsCount } = useSelector((state) => state.blog);
  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [curPage, setCurPage] = useState(1);
  const [search, setSearch] = useState("");
  const [genure, setGenure] = useState("");

  const list = [
    "Lifestyle",
    "Tech",
    "Travel",
    "Food",
    "Fashion",
    "Science",
    "Health",
    "Entertainment",
    "Sports",
    "Technology",
    "Other",
  ];

  const resultPerPage = 10;
  const curPageHandler = (p) => setCurPage(p);

  useEffect(() => {
    getAllBlogs(dispatch, setLoading, search, genure, resultPerPage, curPage);
  }, [setLoading, search, genure, resultPerPage, curPage, dispatch]);

  const numOfPages = Math.ceil(blogsCount / resultPerPage);

  return (
    <>
      <Header />
      <div className="home_blogs">
        <div className="blogs">
          <span className="active">All Blogs</span>
          {token && <span onClick={() => navigate("/my-blog")}>My Blogs</span>}
        </div>
        <div className="search">
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Blogs by Title ..."
          />
          <select onChange={(e) => setGenure(e.target.value)}>
            <option value="">Search By Genure</option>
            {list.map((genure, i) => (
              <option key={i} value={genure}>
                {genure}
              </option>
            ))}
          </select>
        </div>
        <div
          className={`all_blogs ${
            blogs.length === 0 || loading ? "em_blogs" : ""
          }`}
        >
          {loading ? (
            <div className="loader">
              <PulseLoader size={15} color="#36d7b7" />
            </div>
          ) : (
            <>
              {blogs && blogs.length > 0 ? (
                blogs.map((blog, i) => (
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
        {resultPerPage < blogsCount && !loading && (
          <CustomPagination
            pages={numOfPages}
            pageHandler={curPageHandler}
            curPage={curPage}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
