import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReCycle from "./ReCycle";
import axios from "axios";
import "./App.css";

const Sign_up = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPass] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    try {
      // Basic form validation
      if (!fullname || !username || !email || !password || !confirm_password) {
        setError("All fields are required");
        return;
      }

      if (password !== confirm_password) {
        setError("Passwords do not match");
        return;
      }

      // Add more specific validation conditions as needed

      const response = await axios.post("http://localhost:3002/signup", {
        fullname,
        username,
        email,
        password,
        confirm_password,
      });
      console.log(response.data);
      setError("");
      navigate("/sign_in"); // Navigate to signup page on successful signup
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <>
      <ReCycle />
      <div className="message">Sign Up!</div>
      <div className="message">It just takes a few moments!!</div>
      <form>
        <input
          placeholder="Enter the Full name"
          type="text"
          name="name"
          autoComplete="off"
          onChange={(e) => setFullname(e.target.value)}
        />
        <input
          placeholder="Enter the Username"
          type="text"
          name="username"
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="Enter the Email"
          type="text"
          name="email"
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Enter the Password"
          type="password"
          name="password"
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          placeholder="Enter the confirm Password"
          type="password"
          name="confirm_password"
          autoComplete="off"
          onChange={(e) => setConfirmPass(e.target.value)}
        />
        <button type="button" onClick={handleSignup}>
          Register
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}

      <div className="message">
        {" "}
        <Link to="/sign_in">Login</Link>{" "}
      </div>
    </>
  );
};

export default Sign_up;
