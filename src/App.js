import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader.js";

const Home = lazy(() => import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const MyBlog = lazy(() => import("./pages/MyBlog.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
const Blog = lazy(() => import("./pages/Blog.jsx"));

const App = () => {
  const { token } = useSelector((state) => state.auth);
  let user = false;
  if (token) user = true;

  return (
    <Router>
      <Suspense
        fallback={
          <div className="loader">
            <PulseLoader size={15} color="#36d7b7" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/my-blog" element={<MyBlog />} />
          </Route>
          <Route path="/blog/:id" element={<Blog />} />
          <Route
            path="/login"
            element={
              <ProtectedRoute user={!user} redirect="/">
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute user={!user} redirect="/">
                <Register />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster />
    </Router>
  );
};

export default App;
