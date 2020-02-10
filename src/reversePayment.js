const rp = require('request-promise');
const crypto = require('crypto');

// Params array
const paymentUri = 'https://api.demo.crassu.la/v1/transaction/reverse';
const publicKey = 'd55ad89070d6172cc0eeeecfdde2c554';
const privateKey = '7c40fbd9d339299e3cc060e0c9243acb';
const algorithm = 'sha256';

// Reverse payment. Required: Public Key, Payment ID, Sign
//external
let lastPaymentId = "1581352930822330971";
let reversePaymentParams = [
    publicKey,
    lastPaymentId
];
let parameters = reversePaymentParams.sort().join('|');
const signature = crypto.createHmac(algorithm, privateKey).update(parameters).digest('hex');

console.log( "Reverse data is: " + parameters);
console.log( "Signature is : " + signature);
/*
let reversePaymentOptions = {
    method: 'POST',
    uri: paymentUri,
    json: {
      project: publicKey,
      id: lastPaymentId,
      signature: signature
    }
};

async function reversePayment() {
    let id = rp(reversePaymentOptions)
      .then(function (body) {
        //if(body.success)  console.log(`Transaction ID is - ${body.id}`);
        let getReversePaymentId = JSON.parse(body);
        return getReversePaymentId;
      })
      .catch(function (error) {
        console.log(error.error);
      });
      return id;
};
  
async function reversePaymentId() {
    let reverseId = await reversePayment();
    console.log(`Reverse Payment ID is ${reverseId}`);
    return reverseId;
};
reversePaymentId();

*/