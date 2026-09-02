import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

interface SignInData {
  email: string;
  id: number;
}

export interface AuthResult {
  accessToken: string;
  refreshToken: string;
  id: number;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<SignInData | null> {
    const user = await this.usersService.findUserByEmail(email);

    if (user && user.password) {
      const isPasswordMatching = await bcrypt.compare(pass, user.password);
      if (isPasswordMatching) {
        return {
          id: user.id,
          email: user.email,
        };
      }
    }
    return null;
  }

  async generateTokens(user: SignInData) {
    const tokenPayload = {
      sub: user.id,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload, {
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(
      { sub: user.id },
      { expiresIn: '7d' }
    );

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usersService.setCurrentRefreshToken(user.id, hashedRefreshToken);

    return { accessToken, refreshToken };
  }

  async signIn(user: SignInData): Promise<AuthResult> {
    const tokens = await this.generateTokens(user);

    return {
      ...tokens,
      email: user.email,
      id: user.id,
    };
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.usersService.findUserById(userId);
    if (!user || !user.hashedRefreshToken) {
      throw new UnauthorizedException('Доступ заборонено');
    }

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.hashedRefreshToken
    );

    if (!isRefreshTokenMatching) {
      throw new UnauthorizedException('Доступ заборонено');
    }

    const tokens = await this.generateTokens({
      id: user.id,
      email: user.email,
    });

    return tokens;
  }

  async logout(userId: number) {
    await this.usersService.removeRefreshToken(userId);
    return { message: 'Вихід виконано успішно' };
  }

  async register(email: string, pass: string, fullName?: string) {
    const newUser = await this.usersService.createUser(email, pass, fullName);

    return {
      message: 'Реєстрацію успішно завершено',
      id: newUser.id,
      email: newUser.email,
    };
  }
}