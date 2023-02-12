import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { UpdateUserInput } from '../graphql';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '@prisma/client';

@UseGuards(GqlAuthGuard)
@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query('users')
  findAll() {
    return this.usersService.findAll();
  }

  @Query('user')
  findOne(@Args('id') id: number) {
    return this.usersService.findOne(id);
  }
  
  @Query("getMe")
  getMe(@CurrentUser() user: User) {
    return user;
  }

  // @Mutation('updateUser')
  // update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.usersService.update(updateUserInput.id, updateUserInput);
  // }

  // @Mutation('removeUser')
  // remove(@Args('id') id: number) {
  //   return this.usersService.remove(id);
  // }
}
