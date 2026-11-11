import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import type { ConfigType } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
import { authConfig } from '@/config/app.config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly usersService: UsersService,
    @Inject(authConfig.KEY)
    private readonly authConf: ConfigType<typeof authConfig>,
  ) {
    super({
      clientID: authConf.google.clientId!,
      clientSecret: authConf.google.clientSecret!,
      callbackURL: authConf.google.callbackUrl!,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<any> {
    const { name, emails } = profile;
    
    const email = emails[0].value;
    const firstName = name?.givenName || '';
    const lastName = name?.familyName || '';
    const nameAndSurname = `${firstName} ${lastName}`.trim();

    const user = await this.usersService.findOrCreateGoogleUser(
      email,
      nameAndSurname,
    );

    return user;
  }
}