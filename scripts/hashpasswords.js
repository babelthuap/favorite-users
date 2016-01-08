var data = require('../data/users.json');
var fs = require('fs');
var bcrypt = require('bcryptjs')
var CONFIG = require('../util/authConfig');
var path = require('path');

data = data.map(function(doc){

  var salt = bcrypt.genSaltSync(CONFIG.saltRounds);
  var hash = bcrypt.hashSync(doc.password, salt);
  doc.password = hash;
  doc.profilePic = "http://placehold.it/350x300";
  console.log(doc);
  return doc;

});

fs.writeFileSync('../data/usershashed.json', JSON.stringify(data));
