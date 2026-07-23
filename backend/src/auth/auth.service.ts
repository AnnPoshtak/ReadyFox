import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

interface SignInData {
  email: string;
  id: number;
  role: string;
}

export interface AuthResult {
  accessToken: string;
  refreshToken: string;
  id: number;
  email: string;
  role: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(email: string, pass: string): Promise<SignInData | null> {
    const user = await this.usersService.findUserByEmail(email);

    if (user && user.password) {
      const isPasswordMatching = await bcrypt.compare(pass, user.password);
      if (isPasswordMatching) {
        return {
          id: user.id,
          email: user.email,
          role: user.role
        };
      }
    }
    return null;
  }

  async generateTokens(user: SignInData) {
    const tokenPayload = {
      sub: user.id,
      email: user.email,
      role: user.role
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload, {
      expiresIn: '15m', 
    });

    const refreshToken = await this.jwtService.signAsync({ sub: user.id }, {
      expiresIn: '7d', 
    });

    await this.usersService.setCurrentRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }

  async signIn(user: SignInData): Promise<AuthResult> {
    const tokens = await this.generateTokens(user);

    return {
      ...tokens,
      email: user.email,
      id: user.id,
      role: user.role
    };
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.usersService.findUserById(userId);
    if (!user || !user.hashedRefreshToken) {
      throw new UnauthorizedException('Access Denied');
    }

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.hashedRefreshToken
    );

    if (!isRefreshTokenMatching) {
      throw new UnauthorizedException('Access Denied');
    }

    const tokens = await this.generateTokens({
      id: user.id,
      email: user.email,
      role: user.role
    });

    return tokens;
  }

  async logout(userId: number) {
    await this.usersService.removeRefreshToken(userId);
    return { message: 'Logged out successfully' };
  }

  async register(email: string, pass: string) {
    const newUser = await this.usersService.createUser(email, pass);
    return {
      message: 'Registration successful!',
      id: newUser.id,
      email: newUser.email,
      role: newUser.role
    };
  }
}