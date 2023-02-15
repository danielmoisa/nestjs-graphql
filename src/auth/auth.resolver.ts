import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RegisterUserInput, User } from '../graphql';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { GqlAuthGuard } from './guards/gql-auth.guard';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation('registerUser')
    async register(@Args('registerUserInput') registerUserInput: RegisterUserInput) {
      return await this.authService.register(registerUserInput);
    }

    @UseGuards(GqlAuthGuard)
    @Query("getCurrentUser")
    getCurrentUser(@CurrentUser() user: User) {
      return user;
    }

}
