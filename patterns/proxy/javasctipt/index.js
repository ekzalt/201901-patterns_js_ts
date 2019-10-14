const TokenService = require("./token.service");
const SimpleProxy = require("./simple");

// client code

/** @type {TokenService} */
const simpleTokenService = SimpleProxy.create();

try {
  console.log(simpleTokenService.getToken("123"));
  console.log(simpleTokenService.getToken("456"));
} catch (error) {
  console.error(error.message);
}

