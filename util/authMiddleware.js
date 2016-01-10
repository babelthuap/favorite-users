'use strict';

const jwt    = require('jwt-simple')
    , moment = require('moment')
    , CONFIG = require('./authConfig')
    , User   = require('../models/userModel');

module.exports = function(req, res, next) {
  let token = req.cookies.token;

  if (!token) {
    return res.status(401).send('authorization required');
  }

  try {
    var decoded = jwt.decode(token, process.env.JWT_SECRET);
  } catch (e) {
    return res.status(401).send('authorization required');
  }

  if (decoded.exp < moment().unix()) {
    return res.status(401).send('authorization expired');
  }

  req.decodedToken = decoded;
  next();
};
