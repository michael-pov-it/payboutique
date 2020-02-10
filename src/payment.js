const rp = require('request-promise');
const crypto = require('crypto');
//const getUserId = require('./getUserId');
//const getToken = require('./getToken');

// Params array
const paymentUri = 'https://api.demo.crassu.la/v1/card/process';
const publicKey = 'd55ad89070d6172cc0eeeecfdde2c554';
const privateKey = '7c40fbd9d339299e3cc060e0c9243acb';
const algorithm = 'sha256';

// Payment. Required: Public Key, User ID, Card token, Price, Currency, Description, 3DS, Sign
//external
let user = "429";
let token = "a2cd877198d18bf34df845d1b22747924615be0b72e92328c43ab33e7117381b";
//internal
let price = "5.99";
let currency = "USD";
let description = "My custom description.";
let threeDS = "0";
let paymentParams = [
    publicKey,
    user,
    token,
    price,
    currency,
    description,
    threeDS
];
let parameters = paymentParams.sort().join('|');
const signature = crypto.createHmac(algorithm, privateKey).update(parameters).digest('hex');

console.log( "Payment data is: " + parameters);
console.log( "Signature is : " + signature);

let paymentOptions = {
  method: 'POST',
  uri: paymentUri,
  json: {
    publicKey: publicKey,
    user: user,
    token: token,
    price: price,
    currency: currency,
    description: description,
    threeDS: threeDS,
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
      console.log(err.message);
  })
};
/*
payment(function(data) { 
  console.log("Payment: " + data);
});
*/