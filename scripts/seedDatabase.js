'use strict';

var exec = require('child_process').execSync;

exec(`mongoimport --db favorite-users --collection users --drop --file ./data/users.json`);
