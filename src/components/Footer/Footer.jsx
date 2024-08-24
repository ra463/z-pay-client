import React from "react";
import "./Footer.scss";
import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="f_box">
          <div className="flex_col">
            <div className="container main_box">
              <div className="img">
                <img src="/b-logo.svg" alt="logo" />
                <p className="upper">Blog</p>
              </div>
            </div>
            <div className="container">
              <h3>Resources</h3>
              <ul>
                <li>Blog Reviews</li>
                <li>Blog</li>
                <li>Help & Support</li>
                <li>Community</li>
                <li>Tools</li>
              </ul>
            </div>
          </div>
          <div className="flex_col">
            <div className="container">
              <h3>Company</h3>
              <ul>
                <li>About Us</li>
                <li>Careers</li>
                <li>Media Room</li>
                <li>Contact Us</li>
                <li>Relations</li>
              </ul>
            </div>
            <div className="container">
              <h3>More</h3>
              <ul>
                <li>Support</li>
                <li>Events</li>
                <li>Learn More</li>
                <li>Features</li>
              </ul>
            </div>
          </div>
        </div>
        <p className="break"></p>
        <div className="b_box">
          <div className="links">
            <h3>Follow Us</h3>
            <ul>
              <li>
                <BsLinkedin />
              </li>
              <li>
                <BsTwitter />
              </li>
              <li>
                <BsFacebook />
              </li>
              <li>
                <BsInstagram />
              </li>
              <li>
                <BsYoutube />
              </li>
            </ul>
          </div>
          <div className="copy_r">
            <span>© 2024 Blog® Inc.</span>
            <ul>
              <li>Term & Condition</li>
              <li>Privacy Policy</li>
              <li>Accessibility</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
