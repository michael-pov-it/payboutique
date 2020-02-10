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
let getToken = function(getTokenId) {
  rp(getTokenOptions)
  .then(function (body) {
      let token = JSON.parse(body);
      getTokenId(token.id);
      console.log("Card token is: " + token.id);
  })
  .catch(function (err) {
      console.log(err.message);
  });
};
/*
getToken(function(data) { 
  console.log("User's ID is: " + data);
});
*/
module.exports.getToken = getToken(function(data){});