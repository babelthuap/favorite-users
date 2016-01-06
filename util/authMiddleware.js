'use strict';

const jwt    = require('jwt-simple')
    , moment = require('moment')
    , CONFIG = require('./authConfig')
    , User   = require('../models/userModel');

module.exports = function(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send('authorization required');
  }

  let token = req.headers.authorization.replace('Bearer ', '');
  
  try {
    var decoded = jwt.decode(token, process.env.JWT_SECRET);
  } catch (e) {
    return res.status(401).send('authorization required');
  }

  if (decoded.exp < moment().unix()) {
    return res.status(401).send('authorization expired');
  }

  req.userId = decoded.id;
  next();
};
