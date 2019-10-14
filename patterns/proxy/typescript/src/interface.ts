export interface ITokenService {
  getToken(secret: string): string;
}
