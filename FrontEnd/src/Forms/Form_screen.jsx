import React, { useState } from "react";
import ReCycle from "../ReCycle";
import "D:/React-Apps/Linkedin-Clone/FrontEnd/src/css/Form_temp.css";
import { Link } from "react-router-dom";
import {useNavigate } from "react-router-dom";
import axios from "axios";
import {useLocation } from "react-router-dom";

const Form_screen = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username;
  const selectedCategory =location.state?.selectedCategory;

  
  const productOptions = [
    "Televisions",
    "Computer monitors",
    "Laptop screens",
    "Tablet screens",
    "Smartphone screens",
  ];
  const [selectedProduct, setSelectedProduct] = useState("");
  
  const ageOptions = ["0-5", "5-10", "10-15", "15-20"];
  const [selectedAge, setSelectedAge] = useState("");
  
  const conditionOptions = ["Working", "Not Working"];
  const [selectedCondition, setSelectedCondition] = useState("");
  
  const localOptions = ["Local", "Branded"];
  const [selectedLocal, setSelectedLocal] = useState("");
  
  const healthOptions = ["Flawless", "Some Scratches", "Damaged Body"];
  const [selectedHealth, setSelectedHealth] = useState("");

  const [error, setError] = useState("");
  
  

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
      <div className="message">Screen and Monitors</div>

      <input
        type="text"
        name="product"
        placeholder="Product"
        list="product"
        value={selectedProduct}
        onChange={(e) => setSelectedProduct(e.target.value)}
      />
      <datalist id="product">
        {productOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </datalist>

      <input
        type="text"
        name="age"
        placeholder="Age"
        list="age"
        value={selectedAge}
        onChange={(e) => setSelectedAge(e.target.value)}
      />
      <datalist id="age">
        {ageOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </datalist>

      <input
        type="text"
        name="condition"
        placeholder="Condition"
        list="condition"
        value={selectedCondition}
        onChange={(e) => setSelectedCondition(e.target.value)}
      />
      <datalist id="condition">
        {conditionOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </datalist>

      <input
        type="text"
        name="local"
        placeholder="Local or Branded"
        list="l&b"
        value={selectedLocal}
        onChange={(e) => setSelectedLocal(e.target.value)}
      />
      <datalist id="l&b">
        {localOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </datalist>

      <input
        type="text"
        name="health"
        placeholder="Health"
        list="health"
        value={selectedHealth}
        onChange={(e) => setSelectedHealth(e.target.value)}
      />
      <datalist id="health">
        {healthOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </datalist>

      <button onClick={handleSubmit}> <Link to="/pick">Submit</Link></button>
    </>
  );
};

export default Form_screen;
