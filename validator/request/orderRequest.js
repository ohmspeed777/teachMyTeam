const Joi = require('joi');
const AppError = require('../../utility/AppError');

// exports.createOrderReq = async (body, next) => {
//   const schema = Joi.object({
//     hero: Joi.string().required(),
//     amount: Joi.number().required().min(1),
//     price: Joi.number().required().min(0)
//   });

//   return await schema
//     .validateAsync(body)
//     .catch((err) => next(new AppError('', 400, 'joi', err)));
// };

exports.createOrderReq = async (body, next) => {
  const schema = Joi.object({
    heroes: Joi.array().items(
      Joi.object({
        hero: Joi.string().required(),
        amount: Joi.number().required().min(1),
        price: Joi.number().required().min(0),
      })
    ),
  });

  // {
  //   heroes: [
  //     {
  //       hero,
  //       amount,
  //       price
  //     }
  //   ]
  // }

  return await schema
    .validateAsync(body)
    .catch((err) => next(new AppError('', 400, 'joi', err)));
};
