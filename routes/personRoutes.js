// import express
const express = require('express');

// import model
const personModel = require('../models/personModel');

// create another instance to make easier code readability
const router = express.Router();

// route handler for post request to database
router.post("/person", async (req, res) => {
  try {
    const { name, email } = req.body; // access pares request body
    const person = new personModel({ name, email }); // create new instance of data
    await person.save(); // save data to the database
    res.status(201).json({ message: "Data Received" });
  } catch (err) {
    res.status(500).json({ message: `Data Saving Failed ${err}` });
  }
});

// route handler for http get request to database
router.get("/person", async (req, res) => {
  try {
    const persons = await personModel.find();
    res.json(persons);
  } catch (err) {
    res.status(500).send(`Data Fetching Error ${err}`);
  }
});

// route handler for http get request to fetch one person from database
router.get("/person/:id", async (req, res) => {
  try {
    const person = await personModel.findById(req.params.id);
    res.json(person);
  } catch (err) {
    res.status(500).json({ message: `Data Fetching Error: ${err}`});
  }
});

// route handler for http put request to databae
router.put("/person/:id", async (req, res) => {
  try {
    const updatedPerson = await personModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedPerson);
  } catch (err) {
    res.status(500).send(`Data Updating Failure: ${err}`);
  }
});

// route handler for http delete request to database
router.delete("/person/:id", async (req, res) => {
  try {
    await personModel.findByIdAndDelete(req.params.id);
    res.status(201).send({ message: "Data Deleted Successfully" });
  } catch (err) {
    res.status(500).send(`Data Deletion Error: ${err}`);
  }
});

// export router
module.exports = router