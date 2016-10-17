
'use strict';
var crypto = require('crypto');

var ejs = require("ejs");
var mysql = require('./mysql');
var fs=require("file-system");


exports.encrypt=function(text){
  var cipher = crypto.createCipher('aes-256-cbc','CMPE-273-LAB-1');
  var crypted = cipher.update(text,'utf8','hex');
  crypted += cipher.final('hex');
  console.log("ENCRYPED");
  return crypted;
}

exports.decrypt=function(text){
  var decipher = crypto.createDecipher('aes-256-cbc','CMPE-273-LAB-1');
  var dec = decipher.update(text,'hex','utf8');
  dec += decipher.final('utf8');
  console.log("DECRYPTED");
  return dec;
}


/*
//Here i have used sha512 encryption algorithm to hash the password and store the value in the database

'use strict';
var crypto = require('crypto');
var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') //convert to hexadecimal format
            .slice(0,length);   // return required number of characters 
};

//  hash password with sha512.
//  @function
//  @param {string} password - List of required fields.
//  @param {string} salt - Data to be validated.

var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); // Hashing algorithm sha512 
    console.log("hash password"+hash.update(password));
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};

function saltHashPassword(userpassword) {
    var salt ="8bbde54840255d4c"; //Gives us salt of length 16
    var passwordData = sha512(userpassword, salt);
    console.log('UserPassword = '+userpassword);
    console.log('Passwordhash = '+passwordData.passwordHash);
    console.log('\nSalt = '+passwordData.salt);
    return passwordData.passwordHash;
}
exports.saltHashPassword=saltHashPassword;
*/

