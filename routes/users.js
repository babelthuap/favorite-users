'use strict';

const express = require('express')
    , User    = require('../models/userModel');

let router = express.Router();

router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.status(400).send(err);
    users.forEach(user => {
      user.password = null;
      return user;
    });
    res.send(users);
  })
})

router.post('/register', (req, res) => {
  User.register(req.body, (err, token) => {
    if (err) return res.status(400).send(err);
    res.cookie('token', token).send('user created');
  });
});

router.post('/login', (req, res) => {
  User.login(req.body, (err, token) => {
    if (err) return res.status(400).send(err);
    res.cookie('token', token).send();
  });
});

router.get('/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err || !user) return res.status(400).send(err || 'user not found');
    user.password = null;
    res.send(user);
  }).populate('friends');
});

router.delete('/remove/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    res.status(err? 400 : 200).send(err ? 'user delete failed': 'user deleted!')
  })
});

router.put('/addfriend/:userId/:friendId', (req, res) => {
  User.findByIdAndUpdate(req.params.userId, { $push: {friends: req.params.friendId} }, function(err, user){
    res.status(err ? 400 : 200).send(err || 'friend added');
  })
})

router.put('/makeadmin/:userId/', (req, res) => {
  User.findByIdAndUpdate(req.params.userId, { $set: {admin: true} }, function(err, user){
    res.status(err ? 400 : 200).send(err || 'friend added');
  })
})

module.exports = router;
