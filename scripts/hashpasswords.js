var data = require('../data/users.json');
var fs = require('fs');
var bcrypt = require('bcryptjs')
var CONFIG = require('../util/authConfig');

data = data.map(function(doc){

  var salt = bcrypt.genSaltSync(CONFIG.saltRounds);
  var hash = bcrypt.hashSync(doc.password, salt);
  doc.password = hash;
  return doc;

});

fs.writeFileSync('../data/usershashed.json', JSON.stringify(data));
