'use strict';

const express = require('express')
    , User    = require('../models/userModel');

let router = express.Router();

router.post('/register', (req, res) => {
  User.register(req.body, (err, token) => {
    if (err) return res.status(400).send(err);

    res.cookie('token', token).send();
  });
});

router.post('/login', (req, res) => {
  User.login(req.body, (err, token) => {
    if (err) return res.status(400).send(err);

    res.cookie('token', token).send();
  });
});

module.exports = router;
