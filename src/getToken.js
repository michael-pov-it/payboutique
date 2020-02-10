const rp = require('request-promise');

// Params array
const APIUrl = 'http://api.demo.crassu.la/v1/';
const publicKey = 'd55ad89070d6172cc0eeeecfdde2c554';
const number = "4012001037141112";
const expiration_month = "4";
const expiration_year = "2020";
const security_code = "123";
const tokenMethod = 'card/getToken?';

let getTokenOptions = {
  method: 'GET',
  uri: APIUrl + tokenMethod + "project=" + publicKey + "&number=" + number + "&expiration_month=" + expiration_month + "&expiration_year=" + expiration_year + "&security_code=" + security_code
};
async function getToken() {
  let token = rp(getTokenOptions)
    .then(function (body) {
        let token = JSON.parse(body);
        return token.id;
    })
    .catch(function (err) {
        console.log(err.message);
  });
  return token;
};
async function getNewToken() {
  let token = await getToken();
  console.log(token);
  return token;
};
getNewToken();