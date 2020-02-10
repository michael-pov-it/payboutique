const request = require('request');
const rp = require('request-promise');
const crypto = require('crypto');

const userId = require(./index.js);
let token = require('./getToken')( function(data) {} );

// Params array
const APIUrl = 'https://api.demo.crassu.la/v1/';
const publicKey = 'd55ad89070d6172cc0eeeecfdde2c554';
const privateKey = '7c40fbd9d339299e3cc060e0c9243acb';
const algorithm = 'sha256';

// Resolving user. Required: Public Key, Identifier, IP, Sign
const paymentMethod = 'card/process?';
let identifier = "1";
let ip = "127.0.0.1";
let paymentParams = [
    publicKey,
    userId,
    ip
];
let parameters = userResolveParams.sort().join('|');
const signature = crypto.createHmac(algorithm, privateKey).update(parameters).digest('hex');

//console.log( "Resolve user data is: " + parameters);
console.log( "Signature is : " + signature);
let paymentOptions = {
  method: 'POST',
  uri: APIUrl + paymentMethod,
  json: {
    project: publicKey,
    
    signature: signature
  }
};
let payment = function(paymentStatus) {
  rp(paymentOptions)
  .then(function (body, res) {
    let data = body.id;
    paymentStatus(data);
  })
  .catch(function (err) {
      console.log(err);
  })
};
payment(function(data) { 
  console.log("Payment: " + data);
});