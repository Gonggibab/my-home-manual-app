require("dotenv").config();
const cors = require("cors")
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const config = require("./config/key");
var cookieParser = require("cookie-parser");


// Allow port 3000
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// For json request 
app.use(express.json({ extended: true }));
// For urlencoded request
app.use(express.urlencoded({ extended: true }));
// For cookie request
app.use(cookieParser());


// Connect to MongoDB
mongoose
  .connect(config.MongoDB_URL)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });

app.get('/', (err, res) => {
  console.log('hello');
})


app.use('/api/users', require('./routes/UserRoute'));
app.use('/api/images', require('./routes/ImageRoute'));
app.use('/api/story', require('./routes/StoryRoute'));


// to show images in the server to the client
app.use('/uploads/images', express.static('uploads/images'));



app.listen(config.PORT || 5000, () => {
  console.log(`App listening on port ${config.PORT || 5000}`);
});