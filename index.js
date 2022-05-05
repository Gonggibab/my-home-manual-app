require("dotenv").config();
const mongoose = require('mongoose');
const express = require("express")
const app = express()
const { PORT, MongoDB_URL } = process.env

mongoose
  .connect(MongoDB_URL)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT || 5000, () => {
  console.log(`App listening on port ${PORT || 5000}`)
})

// git test