import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserInput } from './dto/update-user.input';

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

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
