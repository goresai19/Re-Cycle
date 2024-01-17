import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReCycle from "./ReCycle";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate(); // Hook for navigation

  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3002/login", {
        username,
        password,
      });
      console.log(response.data);
      setToken(response.data.token);
      setError("");

      // Redirect to main_category page on successful login
      navigate("/main_category", { state: { username } });
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <>
      <body>
        <ReCycle />
        <div className="message">Hello Again!</div>
        <div className="message">Welcome back, You have been missed!!</div>
        <form>
          <div className="container">
            <input
              placeholder="Enter the Username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
            />
            <input
              placeholder="Enter the Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </form>
        {error && <div className="error-message">{error}</div>}{" "}
        {/* Display error message */}
        <div className="signup">
          Not having an account?
          <Link to="/">Sign Up</Link>
        </div>
      </body>
    </>
  );
};

export default Header;
