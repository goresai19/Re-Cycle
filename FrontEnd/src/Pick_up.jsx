import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReCycle from "./ReCycle";
import axios from "axios";

const PickUp = () => {
  // State to store form data and error message

  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    name: "",
    contactNo: "",
    date: "",
    address: "",
    city: "",
    time: "",
  });

  const [error, setError] = useState("");

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for missing fields
    const missingFields = Object.keys(formData).filter((key) => !formData[key]);

    if (missingFields.length > 0) {
      setError(`Please fill in all fields: ${missingFields.join(", ")}`);
      return;
    }

    try {
      // Make the API call to submit pick-up details
      const response = await axios.post(
        "http://localhost:3002/pickup",
        formData
      );

      // Log the response from the server
      console.log("Server Response:", response.data);

      navigate("/price");
    } catch (error) {
      // Handle errors
      console.error("Error submitting pick-up details:", error);
      // TODO: Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <>
      <ReCycle />

      <div className="message">Pick Up Details</div>
      <form onSubmit={handleSubmit}>
        {/* Input fields for pick-up details */}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type="tel"
          name="contactNo"
          placeholder="Contact No."
          value={formData.contactNo}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="date"
          placeholder="Pickup Date"
          value={formData.date}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleInputChange}
        />
        <input
          type="time"
          name="time"
          placeholder="Pickup Time"
          value={formData.time}
          onChange={handleInputChange}
        />

        <button type="submit">Submit</button>

        {/* Display error message if any */}
        {error && <div className="error-message">{error}</div>}
      </form>
    </>
  );
};

export default PickUp;
