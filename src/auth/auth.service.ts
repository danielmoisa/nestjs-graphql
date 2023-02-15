import { Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { CreateUserInput} from '../graphql';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { Response } from "express";
import { TokenPayload } from './interfaces/token-payload.interface';


@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly config: ConfigService,
        private readonly prisma: PrismaService,
        ) {}

    async register(createUserInput: CreateUserInput): Promise<User> {
        const hashPassword = await argon.hash(createUserInput.password);

        return await this.prisma.user.create({
          data: {
            email: createUserInput.email,
            firstName: createUserInput.firstName,
            lastName: createUserInput.lastName,
            profilePictureUrl: createUserInput.profilePictureUrl,
            companyId: createUserInput.companyId,
            subscriptionId: createUserInput.subscriptionId,
            password: hashPassword
          }
        })
      }

  async login(user: User, response: Response) {
    const tokenPayload: TokenPayload = {
      id: user.id,
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.config.get("jwtExpires"),
    );

    const token = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
  }

  async logout(response: Response) {
    response.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date(),
    });
  }
  
  async validateUser(email: string, password: string) {
    const user: Partial<User | null> = await this.prisma.user.findUnique({ where : { email }});
    if(!user) throw new NotFoundException("User not found!")

    let passwordIsValid;

    if(user?.password) {
      passwordIsValid = await argon.verify(user.password, password);
    }

    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }

    delete user?.password;
    return user;
  }
}
