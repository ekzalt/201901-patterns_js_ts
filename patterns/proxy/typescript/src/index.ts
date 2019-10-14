import { ITokenService } from "./interface";
import { SimpleProxy } from "./simple";

// client code

const simpleTokenService: ITokenService = SimpleProxy.create();

try {
  console.log(simpleTokenService.getToken("123"));
  console.log(simpleTokenService.getToken("456"));
} catch (error) {
  console.error(error.message);
}

