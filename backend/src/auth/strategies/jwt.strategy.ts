import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import * as passportJwt from "passport-jwt"; 
import { UsersService } from "../../users/users.service"; 

@Injectable()
export class JwtStrategy extends PassportStrategy(passportJwt.Strategy) { 
    constructor(private readonly usersService: UsersService) {
        super({
            jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'SECRET_KEY', 
        });
    }

    async validate(payload: any) {
        const user = await this.usersService.findUserWithQuizzes(payload.sub);

        if (!user) {
            throw new UnauthorizedException('Користувача не знайдено');
        }
        const { password, hashedRefreshToken, ...result } = user;

        return result;
    }
}