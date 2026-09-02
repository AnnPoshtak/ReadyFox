import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { UsersService } from '../../users/users.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private usersService: UsersService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'YOUR_GOOGLE_CLIENT_SECRET',
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
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

    done(null, {
      id: user.id,
      email: user.email,
      name_and_surname: user.nameAndSurname,
    });
  }
}