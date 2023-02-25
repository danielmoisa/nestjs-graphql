import { Injectable, NotFoundException, UseGuards} from '@nestjs/common';
import { User } from '@prisma/client';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { UpdateUserInput } from '../graphql';
import { PrismaService } from '../prisma/prisma.service';

@UseGuards(GqlAuthGuard)
@Injectable()
export class UsersService {
  constructor(private readonly prisma:PrismaService){}

  async findAll():Promise<Partial<User>[]> {
    return await this.prisma.user.findMany()
  }

  async findOne(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({ where : { id }});
    if(!user) throw new NotFoundException("User not found!");
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where : { email } });
    if(!user) throw new NotFoundException("User not found!");
    return user;
  }

  async update( updateUserInput: UpdateUserInput) {
    const user = await this.prisma.user.findUnique({ where: { id: Number(updateUserInput.id) } });
    if(!user) throw new NotFoundException("Job not found!");

    return await this.prisma.user.update({
      where: { id: Number(updateUserInput.id)},
      data: {
        firstName: updateUserInput.firstName ?? "",
        lastName: updateUserInput.lastName ?? "",
      }
    })
  }

  async remove(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if(!user) throw new NotFoundException("User not found!");
    return  await this.prisma.user.delete({where: { id}})
  }
}
