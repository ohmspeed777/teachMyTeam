const Order = require('../models/orderModel');
const tryCatch = require('../utility/tryCatch');
const AppError = require('../utility/AppError');
const { createOrderReq } = require('../validator/request/orderRequest');

exports.createOrder = tryCatch(async (req, res, next) => {
  const reqBody = await createOrderReq(req.body, next);
  reqBody.user = req.user._id;

  const order = await Order.create(reqBody);
  res.status(201).json({
    status: 'ok',
    order,
  });
});

exports.getOneOrder = tryCatch(async (req, res, next) => {
  // const order = await Order.findById(req.params.id)
  //   .populate({
  //     path: 'hero',
  //     select: 'name',
  //   })
  //   .populate('user');

  const order = await Order.findById(req.params.id)
    .populate({
      path: 'heroes.hero',
      select: 'name',
    })
    .populate('user');

  res.status(201).json({
    status: 'ok',
    order,
  });
});
