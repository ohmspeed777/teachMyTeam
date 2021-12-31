const Hero = require('../models/heroModel');
const tryCatch = require('../utility/tryCatch');

exports.createHero = tryCatch(async (req, res, next) => {
  const hero = await Hero.create(req.body);
  res.status(201).json({
    status: 'success',
    hero,
  });
});

exports.getAllHero = tryCatch(async (req, res, next) => {
  const hero = await Hero.find();
  res.status(201).json({
    status: 'success',
    result: hero.length,
    hero,
  });
});

exports.getOneHero = tryCatch(async (req, res, next) => {
  const hero = await Hero.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    hero,
  });
});

exports.updateHero = tryCatch(async (req, res, next) => {
  const hero = await Hero.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({
    status: 'success',
    hero,
  });
});

exports.deleteHero = tryCatch(async (req, res, next) => {
  await Hero.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    hero: null,
  });
});

exports.testHeroQuery = async (req, res, next) => {
  try {
    // const hero = await Hero.find({
    //   $or: [{ atk: { $gte: 325 } }, { atk: { $gte: 300 } }],
    // });

    // const hero = await Hero.find().select('-_id -__v');
    // const hero = await Hero.find().limit(5).skip(3);
    // const hero = await Hero.find().sort('-name')
    const hero = await Hero.find({ def: { $gt: 100 } })
      .select('-_id -__v')
      .sort('-name')
      .limit(5)
      .skip(5);

    res.status(200).json({
      result: hero.length,
      status: 'success',
      hero,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};
