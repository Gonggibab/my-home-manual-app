const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  userId: {
    type: String,
    maxlength: 50,
    unique: 1, //do not allow duplicate data
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
  },
  role: {
    type: Number,
    default: 0, // 0: normal user, 1: admin user
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Date,
  },
});

// encrypt user password before save it
userSchema.pre('save', function (next) {
  const user = this;

  if (user.isModified('userPass')) {
    bcrypt.hash(user.userPass, saltRounds, function (err, hash) {
      if (err) return next(err);
      user.userPass = hash;
      next();
    });
  } else {
    next();
  };
});

// check user password match with given plainPassword
userSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.userPass, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// generate token and save in user DB
userSchema.methods.generateToken = function (cb) {
  const user = this;

  // generate token
  const token = jwt.sign(user._id.toHexString(), 'userToken');
  user.token = token;

  // set token expire date
  const hours = 1; // set cookie to expire 1 hours later
  const expired = new Date(Date.now() + hours * 60 * 60 * 1000)
  user.tokenExp = expired

  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

// find user using token
userSchema.statics.findByToken = function (token, cb) {
  const user = this;

  // decode the token
  jwt.verify(token, 'userToken', function (err, decoded) {
    if (err) return cb(err);

    user.findOne({ "_id": decoded, "token": token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user)
    });
  });
};



const UserModel = mongoose.model('User', userSchema);
module.exports = { UserModel };