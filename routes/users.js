'use strict';

const express = require('express')
    , User    = require('../models/userModel')
    , authenticate = require('../util/authMiddleware')
    , authenticateAdmin = require('../util/authAdminMiddleware')

let router = express.Router();

router.get('/', authenticate, (req, res) => {
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

router.get('/:id', authenticate, (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err || !user) return res.status(400).send(err || 'user not found');
    user.password = null;
    res.send(user);
  }).populate('friends');
});

router.get('/unpopulated/:id', authenticate, (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err || !user) return res.status(400).send(err || 'user not found');
    user.password = null;
    res.send(user);
  });
});

router.delete('/remove/:id', authenticateAdmin, (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    res.status(err? 400 : 200).send(err ? 'user delete failed': 'user deleted!')
  })
});

router.put('/addfriend/:userId/:friendId', authenticate, (req, res) => {
  User.findByIdAndUpdate(req.params.userId, { $push: {friends: req.params.friendId} }, function(err, user){
    res.status(err ? 400 : 200).send(err || 'friend added');
  })
})

router.put('/removefriend/:userId/:friendId', authenticate, (req, res) => {
  User.findByIdAndUpdate(req.params.userId, { $pull: {friends: req.params.friendId} }, function(err, user){
    res.status(err ? 400 : 200).send(err || 'friend removed');
  })
})

router.put('/makeadmin/:userId/', authenticateAdmin, (req, res) => {
  User.findByIdAndUpdate(req.params.userId, { $set: {admin: true} }, function(err, user){
    res.status(err ? 400 : 200).send(err || 'made into admin');
  })
})

router.put('/:id', authenticate, (req, res) => {
  //admin or that same user can change
  // if(!req.decodedToken.admin && req.param.id !== req.decodedToken.id) {
  //   return res.status(401).send('authorization required');
  // }

  User.findByIdAndUpdate(req.params.id, { $set: req.body }, function(err, user){
    res.status(err ? 400 : 200).send(err || user);
  })
})

module.exports = router;
