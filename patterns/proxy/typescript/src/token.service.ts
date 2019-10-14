import { createHmac } from "crypto";

import { ITokenService } from "./interface";

export class TokenService implements ITokenService {
  private readonly createHmac = createHmac;

  getToken(secret: string): string {
    return this.createHmac('sha256', secret)
      .update('My secret text')
      .digest('hex');
  }
}
