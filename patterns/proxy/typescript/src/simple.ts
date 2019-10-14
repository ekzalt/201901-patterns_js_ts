import { ITokenService } from "./interface";
import { TokenService } from "./token.service";

// Attention! This is only the pattern example. It is not secure to use this class.

export class SimpleProxy implements ITokenService {
  private readonly secret = "123";

  constructor(private readonly target: TokenService) {}
  
  getToken(secret: string): string {
    if (secret !== this.secret) throw new Error("Forbidden");

    return this.target.getToken(secret);
  }

  static create(): SimpleProxy {
    return new SimpleProxy(new TokenService());
  }
}
