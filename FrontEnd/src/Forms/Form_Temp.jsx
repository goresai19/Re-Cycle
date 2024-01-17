import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReCycle from "../ReCycle";
import "D:/React-Apps/Linkedin-Clone/FrontEnd/src/css/Form_temp.css";
import {useNavigate } from "react-router-dom";
import axios from "axios";
import {useLocation } from "react-router-dom";

const Form_Temp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username;
  const selectedCategory =location.state?.selectedCategory;

  const productOptions = [
    "Air conditioners",
    "Refrigerators",
    "Freezers",
    "Heat pumps",
    "Thermostats",
  ];
  const [selectedProduct, setSelectedProduct] = useState("");
  const [error, setError] = useState("");

  const ageOptions = ["0-5", "5-10", "10-15", "15-20"];
  const [selectedAge, setSelectedAge] = useState("");

  const conditionOptions = ["Working", "Not Working"];
  const [selectedCondition, setSelectedCondition] = useState("");

  const localOptions = ["Local", "Branded"];
  const [selectedLocal, setSelectedLocal] = useState("");

  const healthOptions = ["Flawless", "Some Scratches", ""];
  const [selectedHealth, setSelectedHealth] = useState("");

  const handleSubmit = async () => {
    try {
      // Check if all fields are filled
      if (
        !selectedProduct ||
        !selectedAge ||
        !selectedCondition ||
        !selectedLocal ||
        !selectedHealth
      ) {
        setError("All fields are required");
        return;
      }

      // Make the API call
      const response = await axios.post("http://localhost:3002/telemodel", {
        selectedProduct,
        selectedAge,
        selectedCondition,
        selectedLocal,
        selectedHealth,
        username,
        selectedCategory
      });

      // Log the response from the server
      console.log("Server Response:", response.data);

      setError("");

      // Move to the next page using useNavigate
      navigate("/pick",{state:{username,selectedCategory}});
    } catch (error) {
      // Handle errors
      console.error("Error submitting form:", error);
      setError(error.response?.data?.error || "An error occurred");
    }
  };


  return (
    <>
      <ReCycle />
      <div className="message">Temperature Exchange</div>

      <form>
        {/* Select inputs for each option */}
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          <option value="" disabled>Select Product</option>
          {productOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select value={selectedAge} onChange={(e) => setSelectedAge(e.target.value)}>
          <option value="" disabled>Select Age</option>
          {ageOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select
          value={selectedCondition}
          onChange={(e) => setSelectedCondition(e.target.value)}
        >
          <option value="" disabled>Select Condition</option>
          {conditionOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select value={selectedLocal} onChange={(e) => setSelectedLocal(e.target.value)}>
          <option value="" disabled>Select Local or Branded</option>
          {localOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select value={selectedHealth} onChange={(e) => setSelectedHealth(e.target.value)}>
          <option value="" disabled>Select Health</option>
          {healthOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

        <button type="button" onClick={handleSubmit}>
          Submit Form
        </button>

        {/* Display error message if any */}
        {error && <div className="error-message">{error}</div>}
      </form>
    </>
  );
};

export default Form_Temp;
