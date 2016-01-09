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
});

router.post('/checkemail', (req, res) => {
  User.findOne({email: req.body.email}, (err, user) => {
    if (err || user) return res.status(400).send(err || 'email is already in use');
    res.send(req.body.email);
  });
});

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

router.get('/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err || !user) return res.status(400).send(err || 'user not found');
    user.password = null;
    res.send(user);
  }).populate('friends');
});

router.get('/unpopulated/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err || !user) return res.status(400).send(err || 'user not found');
    user.password = null;
    res.send(user);
  });
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

router.put('/removefriend/:userId/:friendId', (req, res) => {
  User.findByIdAndUpdate(req.params.userId, { $pull: {friends: req.params.friendId} }, function(err, user){
    res.status(err ? 400 : 200).send(err || 'friend removed');
  })
})

router.put('/makeadmin/:userId/', (req, res) => {
  User.findByIdAndUpdate(req.params.userId, { $set: {admin: true} }, function(err, user){
    res.status(err ? 400 : 200).send(err || 'made into admin');
  })
})

router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, { $set: req.body }, function(err, user){
    res.status(err ? 400 : 200).send(err || 'user updated');
  })
})

module.exports = router;
