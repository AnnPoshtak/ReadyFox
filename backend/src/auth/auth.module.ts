import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportAuthController } from './passport-auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy'; 
import { GoogleStrategy } from './strategies/google.strategy';
import { RefreshJwtStrategy } from './strategies/refresh-jwt.strategy';
import { authConfig } from '@/config/app.config';
const authConf = authConfig()

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: authConf.jwtSecret, 
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [PassportAuthController],
  providers: [
    AuthService, 
    LocalStrategy, 
    JwtStrategy, 
    GoogleStrategy,
    RefreshJwtStrategy
  ],
})
export class AuthModule {}