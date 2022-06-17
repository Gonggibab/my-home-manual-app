const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { UserModel } = require("../models/UserModel");


// ================== User api ====================

// Authentication
router.get('/auth', auth, (req, res) => {
  res.status(200).json({
    isLogin: true,
    message: "유저 인증에 성공하였습니다",
    _id: req.user._id,
    isAdmin: req.user.role === 1,
    isAuth: true,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role
  });
});

// Register
router.post('/register', (req, res) => {
  const user = new UserModel(req.body)
  user.save((err, userInfo) => {
    if (err) {
      return res.json({
        sucess: false,
        err
      });
    };
    return res.status(200).json({
      success: true
    });
  });
});

// Login
router.post('/login', (req, res) => {
  UserModel.findOne({ userId: req.body.userId }, (err, user) => {
    if (!user) {
      return res.json({
        isLogin: false,
        message: "아이디에 해당하는 유저가 없습니다!"
      });
    };

    user.comparePassword(req.body.userPass, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          isLogin: false,
          message: "제공된 비밀번호가 틀렸습니다!"
        });
      };

      // if correct generate token
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // store token in the cookie
        res.cookie("user_auth", user.token, {
          expires: user.tokenExp,
          httpOnly: true,
          secure: true,
        })
          .status(200)
          .json({
            isLogin: true,
            _id: user._id,
            isAdmin: user.role === 1,
            isAuth: true,
            name: user.name,
            email: user.email,
            role: user.role
          });
      });
    });
  });
});

// Logout
router.get('/logout', auth, (req, res) => {
  UserModel.findOneAndUpdate({ _id: req.user._id },
    { token: "", tokenExp: null }
    , (err, user) => {
      if (err) return res.json({
        isLogin: true,
        message: "로그아웃에 실패하였습니다."
      });
      return res.status(200).send({
        isLogin: false,
        message: "성공적으로 로그아웃되었습니다."
      });
    });
});

module.exports = router;