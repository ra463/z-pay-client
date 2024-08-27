import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.scss";
import { MdOutlineClose } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeToken } from "../../features/authSlice";
import { toast } from "react-hot-toast";
import AddBlog from "../layout/AddBlog";

const Header = () => {
  const { token } = useSelector((state) => state.auth);
  const user = token ? true : false;
  const [showMenu, setShowMenu] = useState(false);
  const [showAddBlog, setShowAddBlog] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const curPage = location.pathname;

  const doSomething = (e) => {
    e.preventDefault();
    setShowAddBlog(true);
    setShowMenu(false);
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(removeToken());
    localStorage.clear();
    navigate("/login");
    toast.success("Logout Successfully");
  };

  return (
    <header>
      <Link to="/">
        <img src="/b-logo.svg" alt="logo" />
        
      </Link>

      <div className="header_right">
        <Link to="/">
          <span>Home</span>
        </Link>
        {user ? (
          <HomeLinks
            curPage={curPage}
            logout={logout}
            doSomething={doSomething}
          />
        ) : (
          <>
            <Link className="login" to="/login">
              <span>LogIn</span>
            </Link>
            <Link className="login" to="/register">
              <span>SignUp</span>
            </Link>
          </>
        )}
        <AiOutlineMenu onClick={() => setShowMenu(true)} />
      </div>
      {showMenu && (
        <div className="header_right_small">
          <div className="close" onClick={() => setShowMenu(false)}>
            <MdOutlineClose />
          </div>
          <div className="links">
            <Link onClick={() => setShowMenu(false)} to="/">
              <span>Home</span>
            </Link>
            {user ? (
              <HomeLinks
                curPage={curPage}
                logout={logout}
                doSomething={doSomething}
              />
            ) : (
              <>
                <Link className="login" to="/login">
                  <span>LogIn</span>
                </Link>
                <Link className="login" to="/register">
                  <span>SignUp</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {showAddBlog && <AddBlog setShowAddBlog={setShowAddBlog} />}
    </header>
  );
};

const HomeLinks = ({ curPage, logout, doSomething }) => {
  return (
    <>
      <Link to="/">
        <span>My Blogs</span>
      </Link>
      {curPage === "/my-blog" && (
        <Link onClick={doSomething}>
          <span className="add">Add New Blog</span>
        </Link>
      )}
      <Link className="login" onClick={logout}>
        <span>Logout</span>
      </Link>
    </>
  );
};

export default Header;
