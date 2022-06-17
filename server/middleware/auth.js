const { UserModel } = require('../models/UserModel')


// User authentication
let auth = (req, res, next) => {
  let token = req.cookies.user_auth;

  UserModel.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({
      isLogin: false,
      message: "유저인증에 실패하였습니다",
      error: true
    });

    req.token = token;
    req.user = user;
    next();
  });
};


module.exports = { auth };