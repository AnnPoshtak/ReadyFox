import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PassportAuthController } from './passport-auth.controller';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy'; 
import { GoogleStrategy } from './strategies/google.strategy';
import { RefreshJwtStrategy } from './strategies/refresh-jwt.strategy';
import { authConfig } from '@/config/app.config';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forFeature(authConfig),
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(authConfig)],
      useFactory: (config: ConfigType<typeof authConfig>) => ({
        secret: config.jwtSecret,
        signOptions: { expiresIn: '1d' },
      }),
      inject: [authConfig.KEY],
    }),
  ],
  controllers: [PassportAuthController],
  providers: [
    AuthService, 
    LocalStrategy, 
    JwtStrategy, 
    GoogleStrategy,
    RefreshJwtStrategy,
  ],
})
export class AuthModule {}