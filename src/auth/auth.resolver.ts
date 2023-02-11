import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginUserInput, RegisterUserInput } from '../graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation('registerUser')
    async register(@Args('registerUserInput') registerUserInput: RegisterUserInput) {
      return this.authService.register(registerUserInput);
    }

    @Mutation('loginUser')
    async login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
      return this.authService.validateUserByPassword(loginUserInput);
    }

}
