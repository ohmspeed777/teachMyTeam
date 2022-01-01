const Joi = require('joi');
const AppError = require('../../utility/AppError');

const handleErrorValidate = (err, next) => {
  next(new AppError('', 400, 'joi', err));
};

exports.signUpReq = async (body, next) => {
  const schema = Joi.object({
    username: Joi.string().required().example('ohm'),
    email: Joi.string().email().required().example('test@gmail.com'),
    password: Joi.string().required().valid('12345678'),
  });

  return await schema
    .validateAsync(body)
    .catch((err) => handleErrorValidate(err, next));
};

exports.signInReq = async (body, next) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  return await schema
    .validateAsync(body)
    .catch((err) => handleErrorValidate(err, next));
};
