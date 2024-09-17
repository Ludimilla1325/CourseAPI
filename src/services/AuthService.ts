import jwt from 'jsonwebtoken';

export class AuthService {
  secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  generateToken(username: string): string {
    return jwt.sign({ username }, this.secretKey, { expiresIn: '1h' });
  }
}