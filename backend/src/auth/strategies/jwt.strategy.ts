import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import * as passportJwt from "passport-jwt";
import { UsersService } from "../../users/users.service";
import type { ConfigType } from "@nestjs/config";
import { authConfig } from "@/config/app.config";

@Injectable()
export class JwtStrategy extends PassportStrategy(passportJwt.Strategy) {
    constructor(
        private readonly usersService: UsersService,
        @Inject(authConfig.KEY)
        private readonly authConf: ConfigType<typeof authConfig>,
    ) {
        super({
            jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: authConf.jwtSecret!,
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