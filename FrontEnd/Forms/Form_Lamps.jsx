import React, { useState } from "react";
import ReCycle from "../ReCycle";
import "../css/Form_temp.css";
import { Link, useNavigate,useLocation } from "react-router-dom";
import axios from "axios"

const Form_Lamps = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username;
  const selectedCategory =location.state?.selectedCategory;

  const [error, setError] = useState("");
  const [productOptions, setProductOptions] = useState([
    "Fluorescent lamps",
    "High intensity discharge lamps",
    "LED lamps",
    "Backlights for screens and monitors",
  ]);
  const [selectedProduct, setSelectedProduct] = useState("");

  const [ageOptions, setAgeOptions] = useState(["0-5", "5-10", "10-15", "15-20"]);
  const [selectedAge, setSelectedAge] = useState("");

  const [conditionOptions, setConditionOptions] = useState(["Working", "Not Working"]);
  const [selectedCondition, setSelectedCondition] = useState("");

  const [localOptions, setLocalOptions] = useState(["Local", "Branded"]);
  const [selectedLocal, setSelectedLocal] = useState("");

  const [healthOptions, setHealthOptions] = useState(["Flawless", "Some Scratches", "Damaged Body"]);
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
      <div className="message">Lamps</div>

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

      <button onClick={handleSubmit}>
        <Link to="/pick">Submit</Link>
      </button>
    </>
  );
};

export default Form_Lamps;
