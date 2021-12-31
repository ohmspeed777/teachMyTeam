const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// load config file
dotenv.config({ path: 'config.env' });

const errorMiddleware = require('./middleware/errorMiddleware');
const AppError = require('./utility/AppError');

const heroRouter = require('./routes/heroRoute');
const userRouter = require('./routes/userRoute');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
  next(new AppError('This is error', 500));
});

app.use('/api/v1/hero', heroRouter);
app.use('/api/v1/user', userRouter);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: 'Not found that url',
  });
});

app.use(errorMiddleware);

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log('Connecting to database successfully'))
  .catch((err) => console.log('Can not to connected to database'));

const port = process.env.PORT || 5000;
// const port = null || undefined || 4000;
app.listen(port, () => {
  console.log('Listening on port: ' + port);
});
