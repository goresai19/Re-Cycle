import React, { useState } from "react";
import ReCycle from "./ReCycle";
import "./css/main_category.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Main_select_category = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username;

  // State to store the selected category
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryClick = (category) => {
    // Update the selectedCategory when a button is clicked
    setSelectedCategory(category);
  };

  const handleNextClick = () => {
    // Navigate to the next page with username and selectedCategory
    navigate(`/${selectedCategory}`, { state: { username, selectedCategory } });
  };

  return (
    <>
      <ReCycle />
      <div className="message">Welcome {username}</div>
      <div className="message">Select Category</div>

      <button className="btn" onClick={() => handleCategoryClick("temp")}>
        Tempreature Exchange
      </button>

      <button className="btn" onClick={() => handleCategoryClick("scre")}>
        Screen and Monitors
      </button>

      <button className="btn" onClick={() => handleCategoryClick("lamp")}>
        Lamps
      </button>

      <button className="btn" onClick={() => handleCategoryClick("larg")}>
        Large Equipments
      </button>

      <button className="btn" onClick={() => handleCategoryClick("smal")}>
        Small Equipments
      </button>

      <button className="btn" onClick={() => handleCategoryClick("tele")}>
        Telecommunication
      </button>

      {/* Button to navigate to the next page */}
      <button onClick={handleNextClick}>Go to Next Page</button>
    </>
  );
};

export default Main_select_category;
