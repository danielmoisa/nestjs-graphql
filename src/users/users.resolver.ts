import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { UpdateUserInput } from '../graphql';

@UseGuards(GqlAuthGuard)
@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query('users')
  async findAll() {
    return await this.usersService.findAll();
  }

  @Query('user')
  async findOne(@Args('id') id: number) {
    return await this.usersService.findOne(id);
  }
  
  @Mutation('updateUser')
  async update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return await this.usersService.update(updateUserInput);
  }

  @Mutation('removeUser')
 async remove(@Args('id') id: number) {
    return await this.usersService.remove(id);
  }
}
