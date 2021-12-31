const User = require('../models/userModel');
const tryCatch = require('../utility/tryCatch');
const Joi = require('joi');
const AppError = require('../utility/AppError');
const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

exports.signUp = tryCatch(async (req, res, next) => {
  const reqSchema = Joi.object({
    username: Joi.string().required().example('ohm'),
    email: Joi.string().email().required().example('test@gmail.com'),
    password: Joi.string().required().valid('12345678'),
  });

  const reqBody = await reqSchema
    .validateAsync(req.body)
    .catch((err) => next(new AppError('', 400, 'joi', err)));

  reqBody.password = await hashPassword(reqBody.password);

  const user = await User.create(reqBody);
  user.password = undefined;

  res.status(201).json({
    status: 'success',
    user,
  });
});
