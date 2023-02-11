import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from '../auth.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService,
        config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get("jwtSecret")
        })
    }

   async validate(payload: JwtPayload): Promise<User | null> {
    const user = await this.authService.validateJwtPayload(payload);

    if (!user) {
      throw new UnauthorizedException(
        'Could not log-in with the provided credentials',
      );
    }

    return user;
    }
}
