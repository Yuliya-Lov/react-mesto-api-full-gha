const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {
  HTTP_STATUS_UNAUTHORIZED,
} = require('../utils/errors');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (value) => validator.isURL(value),
      message: 'Некорректная ссылка для аватара',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Некорректный e-mail',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function ({ email, password }) {
  return this.findOne({ email })
    .orFail(HTTP_STATUS_UNAUTHORIZED)
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(HTTP_STATUS_UNAUTHORIZED);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(HTTP_STATUS_UNAUTHORIZED);
          }
          return user;
        })
        .catch((err) => Promise.reject(err));
    })
    .catch((err) => Promise.reject(err));
};

module.exports = mongoose.model('user', userSchema);
