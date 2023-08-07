const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const createToken = (payload) => jwt.sign(payload, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');

const checkToken = (token) => {
  if (!token) {
    return false;
  }
  try {
    return jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (e) {
    return false;
  }
};

module.exports = {
  createToken,
  checkToken,
};
