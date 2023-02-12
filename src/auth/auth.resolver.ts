import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RegisterUserInput } from '../graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation('registerUser')
    async register(@Args('registerUserInput') registerUserInput: RegisterUserInput) {
      return this.authService.register(registerUserInput);
    }

}
