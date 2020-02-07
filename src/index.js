const request = require('request');
const crypto = require('crypto');

const APIUrl = 'https://api.demo.crassu.la/v1/';
const publicKey = 'd55ad89070d6172cc0eeeecfdde2c554';
const identifier = '1';
const ip = '127.0.0.1';
const privateKey = '7c40fbd9d339299e3cc060e0c9243acb';
const algorithm = 'sha256';
var params = [
    privateKey
];
var parameters = params.toString(params.sort().join('|'));
console.log( parameters);
const signature = crypto.createHmac(algorithm, privateKey).update(parameters).digest('hex');

// Resolving user. Required: Public Key, Identifier, IP, Sign
userMethod = 'user/resolve?';
/*
request(APIUrl + userMethod + 'project=' + publicKey + '&identifier=' + identifier + '&ip=' + ip + '&signature=' + signature,
    { json: true },
    (err, req, res, body) => {
  if (err) { return console.log(err); }
  console.log(res);
});*/