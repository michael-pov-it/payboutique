const rp = require('request-promise');
const crypto = require('crypto');

// Params array
const resolveUserUri = 'https://api.demo.crassu.la/v1/user/resolve?';
const publicKey = 'd55ad89070d6172cc0eeeecfdde2c554';
const privateKey = '7c40fbd9d339299e3cc060e0c9243acb';
const algorithm = 'sha256';
let globalId;

// Resolving user. Required: Public Key, Identifier, IP, Sign
let identifier = "1";
let ip = "127.0.0.1";
let userResolveParams = [
    publicKey,
    identifier,
    ip
];
let parameters = userResolveParams.sort().join('|');
const signature = crypto.createHmac(algorithm, privateKey).update(parameters).digest('hex');

// REQUEST

let resolveUserOptions = {
  method: 'POST',
  uri: resolveUserUri,
  json: {
    project: publicKey,
    identifier: identifier,
    ip: ip,
    signature: signature
  }
};

async function getId(){
  let id = rp(resolveUserOptions)
  .then(function (body) {
    let userId = body.id;
    return userId;
  })
  .catch(function (err) {
      console.log(err.message);
  });
  return id;
};

async function userId() {
  let id = await getId();
  console.log(id);
  return id;
};
userId();