// import mongoose
const mongoose = require('mongoose');

// define schemas
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  }
});

// define model
const personModel = mongoose.model("person", personSchema);

// export the model
module.exports = personModel;