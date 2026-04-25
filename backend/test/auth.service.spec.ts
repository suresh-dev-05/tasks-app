import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../src/auth/auth.service';

describe('AuthService (unit)', () => {
  let service: AuthService;

  beforeEach(() => {
    service = new AuthService();
  });

  it('registers a new user', () => {
    const result = service.register({ email: 'unit@example.com', password: 'secret123' });

    expect(result).toEqual(
      expect.objectContaining({
        id: 1,
        email: 'unit@example.com',
        message: 'Registered successfully',
      }),
    );
  });

  it('throws when registering duplicate email', () => {
    service.register({ email: 'unit@example.com', password: 'secret123' });

    expect(() => service.register({ email: 'unit@example.com', password: 'secret123' })).toThrow(
      BadRequestException,
    );
  });

  it('logs in with valid credentials', () => {
    service.register({ email: 'unit@example.com', password: 'secret123' });

    const result = service.login({ email: 'unit@example.com', password: 'secret123' });

    expect(result).toEqual(
      expect.objectContaining({
        id: 1,
        email: 'unit@example.com',
        message: 'Login successful',
      }),
    );
  });

  it('throws on invalid login', () => {
    expect(() => service.login({ email: 'none@example.com', password: 'secret123' })).toThrow(
      UnauthorizedException,
    );
  });
});
