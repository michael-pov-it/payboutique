const request = require('request');
const rp = require('request-promise');
const crypto = require('crypto');

// Params array
const APIUrl = 'https://api.demo.crassu.la/v1/';
const publicKey = 'd55ad89070d6172cc0eeeecfdde2c554';
const privateKey = '7c40fbd9d339299e3cc060e0c9243acb';
const algorithm = 'sha256';

// Resolving user. Required: Public Key, Identifier, IP, Sign
const userMethod = 'user/resolve?';
let identifier = "1";
let ip = "127.0.0.1";
let userResolveParams = [
    publicKey,
    identifier,
    ip
];
let parameters = userResolveParams.sort().join('|');
const signature = crypto.createHmac(algorithm, privateKey).update(parameters).digest('hex');

//console.log( "Resolve user data is: " + parameters);
console.log( "Signature is : " + signature);
let resolveUserOptions = {
  method: 'POST',
  uri: APIUrl + userMethod,
  json: {
    project: publicKey,
    identifier: identifier,
    ip: ip,
    signature: signature
  }
};
let userId = function(getUserID) {
  rp(resolveUserOptions)
  .then(function (body, res) {
    let data = body.id;
    getUserID(data);
  })
  .catch(function (err) {
      console.log(err);
  })
};
/*userId(function(data) { 
  console.log("User's ID is: " + data);
});*/

let token = require('./getToken')( function(data) {} );

module.exports.userId = userId;