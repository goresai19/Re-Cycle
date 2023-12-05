// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt =require('bcrypt');
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/forms_data', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const teleSchema = new mongoose.Schema({
  product: String,
  age: String,
  condition: String,
  local: String,
  health: String,
  username:String,
  selectedCategory:String,
});

const TeleModel = mongoose.model('TeleModel', teleSchema);

app.post('/telemodel', async (req, res) => {
  try {
    const {
      selectedProduct,
      selectedAge,
      selectedCondition,
      selectedLocal,
      selectedHealth,
      username,
      selectedCategory
    } = req.body;

    if (!selectedProduct || !selectedAge || !selectedCondition || !selectedLocal || !selectedHealth) {
      return res.status(400).json({ success: false, error: "All fields are required" });
    }

    const newTeleForm = new TeleModel({
      product: selectedProduct,
      age: selectedAge,
      condition: selectedCondition,
      local: selectedLocal,
      health: selectedHealth,
      username: username,
      selectedCategory : selectedCategory,
    });

    const savedTeleForm = await newTeleForm.save();

    res.json({ message: 'Form submitted successfully', data: savedTeleForm });
  } catch (error) {
    console.error("Error saving form:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




//login and signup


const User = mongoose.model("User", {
  fullname: String,
  username: String,
  email: String,
  password: String,
});

app.post("/signup", async (req, res) => {
  const { fullname, username, email, password, confirm_password } = req.body;

  // Basic validation
  if (!fullname || !username || !email || !password || !confirm_password) {
    return res.status(400).json({ success: false, error: "All fields are required" });
  }

  if (password !== confirm_password) {
    return res.status(400).json({ success: false, error: "Passwords do not match" });
  }
  const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ success: false, error: "Email is already in use" });
    }

    // Check if username is already in use
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ success: false, error: "Username is already in use" });
    }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ fullname, username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res.status(400).json({ success: false, error: "All fields are required" });
  }

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).json({ success: false, error: "Invalid username or password" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ success: false, error: "Invalid username or password" });
  }

  // Generate a JWT token for authentication
  const token = jwt.sign({ userId: user._id }, "your-secret-key", { expiresIn: "1h" });

  res.json({ success: true, token, username: user.username });

});

//pick
const pickUpSchema = new mongoose.Schema({
  name: String,
  contactNo: String,
  date: String,
  address: String,
  city: String,
  time: String,
});

const PickUpModel = mongoose.model('PickUpModel', pickUpSchema);

app.post('/pickup', async (req, res) => {
  try {
    const { name, contactNo, date, address, city, time } = req.body;

    // Check for missing fields
    const missingFields = ["name", "contactNo", "date", "address", "city", "time"].filter(
      (field) => !req.body[field]
    );

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Please fill in all fields: ${missingFields.join(", ")}`,
      });
    }

    // Your existing code to save pick-up details
    const newPickUp = new PickUpModel({
      name,
      contactNo,
      date,
      address,
      city,
      time,
    });

    const savedPickUp = await newPickUp.save();

    res.json({ message: 'Pick Up details submitted successfully', data: savedPickUp });
  } catch (error) {
    console.error("Error submitting Pick Up details:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
