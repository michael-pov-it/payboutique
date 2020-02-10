const rp      = require('request-promise');
const crypto  = require('crypto');

//var user      = require('./getUserId');
let user        = "429";
//var getToken  = require('./getToken');
let token       = "49b7e844a0b3c4cbc3c4630c4fcd3dda7335c541574869c7987841f97fde831d";

// Params array
const paymentUri  = "https://api.demo.crassu.la/v1/card/process";
const publicKey   = "d55ad89070d6172cc0eeeecfdde2c554";
const privateKey  = "7c40fbd9d339299e3cc060e0c9243acb";
const algorithm   = "sha256";

// Payment. Required: Public Key, User ID, Card token, Price, Currency, Description, 3DS, Sign
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
    "project": publicKey,
    "user": user,
    "card_token": token,
    "price": price,
    "currency": currency,
    "description": description,
    "3ds": threeDS,
    "signature": signature
  }
};
async function payment() {
  let id = rp(paymentOptions)
    .then(function (body) {
      //if(body.success)  console.log(`Transaction ID is - ${body.id}`);
      let getPpaymentId = body.id;
      return getPpaymentId;
    })
    .catch(function (error) {
      console.log(error.error);
    });
    return id;
};

async function paymentId() {
  let id = await payment();
  console.log(`Transaction id is ${id}`);
  return id;
};
paymentId();