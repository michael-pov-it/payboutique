const request = require('request');
const crypto = require('crypto');
// Params array
const APIUrl = 'https://api.demo.crassu.la/v1/';
const publicKey = 'd55ad89070d6172cc0eeeecfdde2c554';
const privateKey = '7c40fbd9d339299e3cc060e0c9243acb';
const algorithm = 'sha256';

// Resolving user. Required: Public Key, Identifier, IP, Sign
var userMethod = 'user/resolve?';
var identifier = "1";
var ip = "127.0.0.1";
var userResolveParams = [
    publicKey,
    identifier,
    ip
];
var parameters = userResolveParams.sort().join('|');
//console.log( "data is" + parameters);
const signature = crypto.createHmac(algorithm, privateKey).update(parameters).digest('hex');
//console.log("Signature is - " + signature);
//console.log(APIUrl + userMethod + 'project=' + publicKey + '&identifier=' + identifier + '&ip=' + ip + '&signature=' + signature);
var user_id = request.post(APIUrl + userMethod, {
  json: {
    project: publicKey,
    identifier: identifier,
    ip: ip,
    signature: signature
  }
}, (error, res, body) => {
  if (error) {
    console.error(error)
    return
  }
  //return body.id
  console.log(`statusCode: ${res.statusCode}`)
  console.log("User's ID: " + body.id);
});
//console.log(user_id);