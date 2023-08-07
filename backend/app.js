const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');

const { PORT = 4000 } = process.env;
const app = express();
const bodyParser = require('body-parser');
const { createUser, login, logout } = require('./controllers/users');
const { userRouter, urlPattern } = require('./routes/users');
const { cardRouter } = require('./routes/cards');
const { auth } = require('./middlewares/auth');
const {
  HTTP_PAGE_STATUS_NOT_FOUND,
  customErrors,
} = require('./utils/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://0.0.0.0:27017/mestodb', {
  useNewUrlParser: true,
});

/* const allowedCors = [
  'https://place.nomoreparties.co',
  'http://place.nomoreparties.co',
  'http://localhost:3000',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

app.use((req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  next();
});
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:3000', 'https://place.nomoreparties.co'], credentials: true }));
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlPattern),
  }).unknown(true),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }).unknown(true),
}), login);

app.post('/signout', logout);

app.use('/users', celebrate({
  cookies: Joi.object().keys({
    jwt: Joi.string(),
  }),
}), auth, userRouter);

app.use('/cards', celebrate({
  cookies: Joi.object().keys({
    jwt: Joi.string(),
  }),
}), auth, cardRouter);
app.use('/*', (req, res, next) => {
  next(HTTP_PAGE_STATUS_NOT_FOUND);
});

app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => customErrors(err, req, res, next));

app.listen(PORT, () => {
  console.log(`App Yul listening on port ${PORT}`);
});
