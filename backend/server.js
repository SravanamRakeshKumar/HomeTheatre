const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Razorpay = require('razorpay');
const app = express();
const Latest = require('./Latest.json');
require("dotenv").config();


const MONGODB_CLOUD_URL = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/Latest", (req, res) => {
  res.json(Latest);
});



const baseSchema = new mongoose.Schema({
  id: String,
  movie_name: String,
  movie_pic: String,
  year: Number,
  language: String,
  zoner: String,
  rating: Number,
  director: String,
  video: String,
  seats_booked: [String],
});


const Movie = mongoose.model("Movie", baseSchema, "Movies");
const Show = mongoose.model("Show", baseSchema, "Shows");
const Webseries = mongoose.model("Webseries", baseSchema, "Webseries");



mongoose.connect(`${MONGODB_CLOUD_URL}`, {
  dbName: "HomeTheatre",
})
  .then(() => console.log("✅ MongoDB Connected to Atlas"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.get("/", (req, res) => {
  res.send("Server is working fine 🎉");
});


app.get("/movies", async (req, res) => {
  try {
    const allMovies = await Movie.find();
    res.send(allMovies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ message: "Failed to fetch movies" });
  }
});

app.get("/movies/:id", async (req, res) => {
  const movieId = Number(req.params.id); 
  try {
    const movie = await Movie.findOne({ id: movieId });
    if (movie) {
      res.send(movie);
    } else {
      res.status(404).send({ message: "Movie not found" });
    }
  } catch (error) {
    console.error("Error fetching movie:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});


app.patch("/movies/:id", async (req, res) => {
  const movieId = req.params.id;
  const updatedSeats = req.body.seats_booked;

  try {
    const movie = await Movie.findByIdAndUpdate(
      movieId,
      { $set: { seats_booked: updatedSeats } },
      { new: true }
    );

    if (movie) {
      res.send({ message: "Seats updated successfully", movie });
    } else {
      res.status(404).send({ message: "Movie not found" });
    }
  } catch (error) {
    console.error("Error updating movie:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});


app.get("/shows", async (req, res) => {
  try {
    const allShows = await Show.find();
    res.send(allShows);
  } catch (error) {
    console.error("Error fetching shows:", error);
    res.status(500).json({ message: "Failed to fetch shows" });
  }
});

app.get("/webseries", async (req, res) => {
  try {
    const allWebseries = await Webseries.find();
    res.send(allWebseries);
  } catch (error) {
    console.error("Error fetching webseries:", error);
    res.status(500).json({ message: "Failed to fetch webseries" });
  }
});


const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

const Users = mongoose.model("User", userSchema, "users");

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const newUser = new Users({ username, password });

  try {
    const result = await newUser.save();
    res.send({ message: "Account created successfully" });
  } catch (err) {
    res.status(500).send({ message: "Signup failed", error: err.message });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Users.findOne({ username });

    if (!user) {
      return res.status(401).send({ message: "user not found" });
    }
    if (password !== user.password) {
      return res.status(401).send({ message: "password is not correct" });
    }

    res.send({ message: "login successful" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "internal server error" });
  }
});

const razorpay = new Razorpay({
  key_id: 'rzp_test_ltmkskOb29dwDe',
  key_secret: 'pqfth2mcL3A4l0fJPOcJDEcO'
});

app.post("/api/create-order", async (req, res) => {
  const { amount } = req.body;
  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt: "receipt_order_" + Date.now(),
  });
  res.json(order);
});

app.listen(PORT, () => {
  console.log("Express server running on port " + PORT);
});