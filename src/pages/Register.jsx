import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../components/styles/Login.scss";
import PulseLoader from "react-spinners/PulseLoader";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosUtils";
import { setToken } from "../features/authSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axiosInstance.post("/api/user/register", {
        name,
        email,
        password,
      });

      if (data.success) {
        setLoading(false);
        toast.success(data.message);
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("name", data.user.name);
        localStorage.setItem("id", data.user._id);

        dispatch(
          setToken({
            token: data.token,
            email: data.user.email,
            name: data.user.name,
            id: data.user._id,
          })
        );
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return token ? (
    <Navigate to="/" />
  ) : (
    <>
      <header>
        <Link to="/">
          <img src="/b-logo.svg" alt="logo" />
        </Link>
      </header>
      <div className="login-div">
        <form className="loginform" onSubmit={loginHandler}>
          <h2>Register Here!</h2>
          <span className="head">Welcome Back! Please enter your details.</span>
          <p className="name">Full Name</p>
          <input
            type="text"
            placeholder="John Doe"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p className="email">Email</p>
          <input
            type="email"
            placeholder="email@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="email">Password</p>
          <input
            type="password"
            placeholder="Enter Your Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Link to="/login" className="signup">
            <span>Go to Login?</span>
          </Link>

          <button disabled={loading} type="submit">
            {loading ? <PulseLoader color="#fff" size={5} /> : "SIGNUP"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
