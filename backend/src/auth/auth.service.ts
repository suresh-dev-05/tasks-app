import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from './auth.types';

@Injectable()
export class AuthService {
  private users: User[] = [];
  private nextId = 1;

  register(dto: RegisterDto) {
    const exists = this.users.some((u) => u.email === dto.email);

    if (exists) {
      throw new BadRequestException('Email already registered');
    }

    const user: User = {
      id: this.nextId++,
      email: dto.email,
      password: dto.password,
    };

    this.users.push(user);

    return {
      id: user.id,
      email: user.email,
      message: 'Registered successfully',
    };
  }

  login(dto: LoginDto) {
    const user = this.users.find((u) => u.email === dto.email && u.password === dto.password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      id: user.id,
      email: user.email,
      message: 'Login successful',
    };
  }
}
