import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { CreateUserInput, LoginUserInput, UserLoginResponse } from '../graphql';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly config: ConfigService,
        private readonly prisma: PrismaService,
        ) {}

    async register(createUserInput: CreateUserInput): Promise<User> {
        console.log("createuserInput: ", createUserInput)
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

    // async verify(token: string): Promise<User> {
    //     const decoded = await this.jwtService.verify(token, {
    //         secret: this.config.get("jwtSecret")
    //     });

    //     const user = await this.usersService.findByEmail(decoded.email);
    //     if(!user) throw new Error("Invalid credentials!");

    //     return user;
    // }

    
  /**
   * Verifies that the JWT payload associated with a JWT is valid by making sure the user exists and is enabled
   *
   * @param {JwtPayload} payload
   * @returns {(Promise<UserDocument | undefined>)} returns undefined if there is no user or the account is not enabled
   * @memberof {(AuthService JwtStrategy)}
   */
  async validateJwtPayload(
    payload: JwtPayload,
  ): Promise<User| undefined> {
    // This will be used when the user has already logged in and has a JWT
    const user = await this.usersService.findByEmail(payload.email);

    // Ensure the user exists and their account isn't disabled
    if (user) {
      return user;
    }

    return undefined;
  }

  async validateUserByPassword(
    loginAttempt: LoginUserInput,
  ): Promise<UserLoginResponse| undefined> {
    // This will be used for the initial login
    const userToAttempt: User = await this.usersService.findByEmail(
        loginAttempt.email,
      );


    // If the user is not enabled, disable log in - the token wouldn't work anyways
    // if (userToAttempt && userToAttempt.enabled === false)
    //   userToAttempt = undefined;

    if (!userToAttempt) throw new UnauthorizedException(
        'Could not log-in with the provided credentials',
      );

    // Check the supplied password against the hash stored for this email address
    let isMatch = false;
    
    try {
      isMatch = await argon.verify(userToAttempt.password, loginAttempt.password);
    } catch (error) {
      throw new UnauthorizedException(
        'Could not log-in with the provided credentials',
      );
    }

    if (isMatch) {
      // If there is a successful match, generate a JWT for the user
      const token = this.jwtService.sign(userToAttempt)

      return { access_token: token}
    }

    throw new UnauthorizedException(
        'Could not log-in with the provided credentials',
      );
  }

}
