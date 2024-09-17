import { AuthService } from './AuthService';
import jwt from 'jsonwebtoken';

describe('AuthService', () => {
  let authService: AuthService;

  beforeAll(() => {
    process.env.SECRET_KEY = 'your_test_secret_key';
  });

  beforeEach(() => {
    authService = new AuthService(process.env.SECRET_KEY as string);
  });

  describe('generateToken', () => {
    it('should generate a valid JWT', () => {
      const token = authService.generateToken('test');
      const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
      expect(decoded).toHaveProperty('username', 'test');
    });
  });
});