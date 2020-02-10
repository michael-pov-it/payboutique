const rp = require('request-promise');
const crypto = require('crypto');

// Params array
const paymentUri = 'https://api.demo.crassu.la/v1/transaction/reverse';
const publicKey = 'd55ad89070d6172cc0eeeecfdde2c554';
const privateKey = '7c40fbd9d339299e3cc060e0c9243acb';
const algorithm = 'sha256';

// Reverse payment. Required: Public Key, Payment ID, Sign
//external
let paymentId = "1581331469219172091";
let reversePaymentParams = [
    publicKey,
    paymentId
];
let parameters = reversePaymentParams.sort().join('|');
const signature = crypto.createHmac(algorithm, privateKey).update(parameters).digest('hex');

console.log( "Payment data is: " + parameters);
console.log( "Signature is : " + signature);

let reversePaymentOptions = {
    method: 'POST',
    uri: paymentUri,
    json: {
      project: publicKey,
      id: paymentId,
      signature: signature
    }
};
let reversePayment = function(reversePaymentStatus) {
    setTimeout(function() {
        rp(reversePaymentOptions)
        .then(function (body, res) {
        let data = body.id;
        reversePaymentStatus(data);
        })
        .catch(function (err) {
            console.log(err.message);
        })
    }, 3000);
};
/*
reversePayment(function(data) { 
    console.log("reverse payment: " + data);
});
*/
module.exports.reversePayment = reversePayment(function(data){});