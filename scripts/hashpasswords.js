var data = require('../data/users.json');
var fs = require('fs');
var bcrypt = require('bcryptjs')
var CONFIG = require('../util/authConfig');

console.log('hashing passwords & adding profile pics');

data = data.map(function(doc){
  var salt = bcrypt.genSaltSync(CONFIG.saltRounds);
  var hash = bcrypt.hashSync(doc.password, salt);
  doc.password = hash;
  doc.profilePic = "http://placehold.it/350x300";
  return doc;
});

console.log('writing to data/usershashed.json');

fs.writeFileSync('./data/usershashed.json', JSON.stringify(data));
