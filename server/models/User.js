const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = mongoose.Schema({
  userId: {
    type: String,
    maxlength: 50,
  },
  userPass: {
    type: String,
    minlength: 5,
  },
  name: {
    type: String,
    maxlength: 50,
  },
  birthday: {
    type: String,
    maxlength: 10,
  },
  email: {
    type: String,
    maxlength: 50,
    trim: true, // delete empty space
    unique: 1, // do not allow duplicate data
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
})

// encrypt user password before save it
userSchema.pre('save', function (next) {
  var user = this

  if (user.isModified('userPass')) {
    bcrypt.hash(user.userPass, saltRounds, function (err, hash) {
      if (err) return next(err)
      user.userPass = hash
      next()
    });
  } else {
    next()
  }
})

userSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.userPass, function (err, isMatch) {
    if (err) return cb(err),
      cb(null, isMatch)
  });
}

const User = mongoose.model('User', userSchema);

module.exports = { User }