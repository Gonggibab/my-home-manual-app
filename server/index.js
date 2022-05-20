require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express")
const app = express()
const { PORT, MongoDB_URL } = process.env
const { User } = require("./models/User")


// For json request 
app.use(express.json({ extended: true }));
// For urlencoded request
app.use(express.urlencoded({ extended: true }));


// Connect to MongoDB
mongoose
  .connect(MongoDB_URL)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });


// Users api
// Register
app.post('/api/users/register', (req, res) => {
  const user = new User(req.body)
  user.save((err, userInfo) => {
    if (err) {
      return res.json({
        sucess: false,
        err
      })
    }
    return res.status(200).json({
      success: true
    })
  })
})
// Login
app.post('/api/users/login', (req, res) => {
  User.findOne({ userId: req.body.userId }, (err, user) => {
    if (!user) {
      return res.json({
        loginsuccess: false,
        message: "제공된 아이디에 해당하는 유저가 없습니다"
      })
    }

    user.comparePassword(req.body.userPass, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginsuccess: false,
          message: "제공된 비밀번호가 틀렸습니다"
        })
      }


    })

  })

})


app.listen(PORT || 5000, () => {
  console.log(`App listening on port ${PORT || 5000}`)
})