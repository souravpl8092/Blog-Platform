import React, { useState } from "react";
import Login from "../Components/Auth/Login";
import Signup from "../Components/Auth/Signup";
import { ToastContainer } from "react-toastify";
import "../styles/Home.css";

function Auth() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const openLogin = () => {
    setIsLoginOpen(true);
    setIsSignupOpen(false);
  };

  const openSignup = () => {
    setIsSignupOpen(true);
    setIsLoginOpen(false);
  };
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Blog Platform</h1>
        <p>Write, share, and connect with a community of amazing people.</p>
      </header>

      <div className="home-buttons">
        <button className="login-btns" onClick={openLogin}>
          Sign In
        </button>
        <button className="signup-btn" onClick={openSignup}>
          Sign Up
        </button>
      </div>
      {isLoginOpen && (
        <Login onClose={() => setIsLoginOpen(false)} openSignup={openSignup} />
      )}
      {isSignupOpen && (
        <Signup onClose={() => setIsSignupOpen(false)} openLogin={openLogin} />
      )}
      <ToastContainer />
    </div>
  );
}

export default Auth;
