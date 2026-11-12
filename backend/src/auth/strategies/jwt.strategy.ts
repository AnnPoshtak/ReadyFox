import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { authConfig } from "@/config/app.config";
import type { ConfigType } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(authConfig.KEY)
        private readonly authConf: ConfigType<typeof authConfig>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKeyProvider: (request, rawJwtToken, done) => {
                done(null, authConf.jwtSecret!);
            },
        });
    }

    async validate(payload: any) {
        return { id: payload.sub, email: payload.email };
    }
}