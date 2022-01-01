const User = require('../models/userModel');
const tryCatch = require('../utility/tryCatch');
const AppError = require('../utility/AppError');
const jwt = require('jsonwebtoken');

const { signUpReq, signInReq } = require('../validator/request/userRequest');

exports.signUp = tryCatch(async (req, res, next) => {
  const reqBody = await signUpReq(req.body, next);

  const user = await User.create(reqBody);
  user.password = undefined;

  res.status(201).json({
    status: 'success',
    user,
  });
});

exports.signIn = tryCatch(async (req, res, next) => {
  const reqBody = await signInReq(req.body, next);

  const user = await User.findOne({ username: reqBody.username }).select(
    '+password'
  );

  if (!user || !(await user.checkPassword(reqBody.password, user.password))) {
    return next(new AppError('Incorrect username or password', 401));
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXP,
  });

  res.json({
    status: 'success',
    user,
    token,
  });
});
