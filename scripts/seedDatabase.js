'use strict';

var exec = require('child_process').execSync;

console.log('seeding database from data/usershashed.json');

exec(`mongoimport --db favorite-users --collection users --drop --file ./data/usershashed.json --jsonArray`);
