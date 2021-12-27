const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Hero = require('./models/heroModel');

// load config file
dotenv.config({ path: 'config.env' });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
  res.json({
    message: 'OK',
  });
});

app.post('/api/v1/hero', async (req, res, next) => {
  // db.hero.insert({})
  // db.hero.insertMany([{}, {}])
  try {
    const hero = await Hero.create(req.body);
    res.status(201).json({
      status: 'success',
      hero,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
});

app.get('/api/v1/hero', async (req, res, next) => {
  // db.hero.find()
  // db.hero.findOne()
  try {
    const hero = await Hero.find();
    res.status(201).json({
      status: 'success',
      result: hero.length,
      hero,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
});

app.patch('/api/v1/hero/:id', async (req, res, next) => {
  // db.hero.updateOne({}, {})
  // db.hero.updateMany({}, {})
  try {
    const hero = await Hero.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: 'success',
      hero,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
});

app.delete('/api/v1/hero/:id', async (req, res, next) => {
  // db.hero.deleteOne({})
   // db.hero.deleteMany({})
  try {
    await Hero.findByIdAndDelete(req.params.id)
    res.status(204).json({
      status: 'success',
      hero: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
})

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log('Connecting to database successfully'))
  .catch((err) => console.log('Can not to connected to database'));

const port = process.env.PORT || 5000;
// const port = null || undefined || 4000;
app.listen(port, () => {
  console.log('Listening on port: ' + port);
});
