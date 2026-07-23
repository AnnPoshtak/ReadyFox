import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import * as passportJwt from "passport-jwt"; 

@Injectable()
export class JwtStrategy extends PassportStrategy(passportJwt.Strategy) { 
    constructor() {
        super({
            jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'secretKey', 
        });
    }

    async validate(payload: any) {
        return { userId: payload.sub, email: payload.email, role: payload.role };
    }
}