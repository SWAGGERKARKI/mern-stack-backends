// import express module
const express = require('express');

// import mongoose module
const mongoose = require('mongoose');

// import routes for person 
const personRoutes = require('./routes/personRoutes');

// import cors
const cors = require('cors');

// express itself is a function so it could not be used for http requests, routing handler and connection to the server
// create application instance
const app = express();

// connection to mongodb
mongoose
  .connect("mongodb+srv://karkioceann:Password123Access@cluster0.qha4b.mongodb.net/")
  .then(() => console.log("Mongodb connected successfully."))
  .catch((err) => console.error(err));

// middleware for incoming requests
app.use((req, res, next) => {
  console.log(`Incoming Requests: ${req.method} ${req.url}`);
  next(); // move to next middleware or route handler
});

// middleware to parse request body
app.use(express.json());

// middleware to allow cors policy
app.use(cors());

// middle to use api before moving to person route handler
app.use("/api", personRoutes);

// route handler for http request to home page
app.get("/", (req, res) => {
  res.send("This is home page."); // message send to the client
});

// route handler for http request to about page
app.get("/about", (req, res) => {
  res.send("This is about page.");
});

// route handler for http request to contact page
app.get("/contact", (req, res) => {
  res.send("This is contact page.");
});

// route handler for http post request to submit the data
app.post("/submit", (req, res) => {
  // req body needs to be pared into javascript object so that we can access it
  // it can be done through middleware
  // middlware function which responsible for logging requests, parsing requset body etc before going to route handler
  console.log(req.body);
  const { name, email } = req.body;
  res.send(`Data Received ${name} - ${email}`);
});

// connection to the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log("Connection to the server at Port:", PORT);
});