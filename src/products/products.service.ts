import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService){}

  async create(createProductInput: CreateProductInput) {
    return this.prisma.product.create({
      data: createProductInput
    })
  }

 async findAll() {
    return  this.prisma.product.findMany();
  }

 async findOne(id: number) {
    return this.prisma.product.findUnique({
      where: {
        id
      }
    })
  }

 async update(id: number, updateProductInput: UpdateProductInput) {
    const product = await this.prisma.product.findUnique({where: {id}})
    if(!product) throw new NotFoundException("Product not found!")
    return this.prisma.product.update({
      where: {id},
      data: updateProductInput
    })
  }

  async remove(id: number) {
    const product = await this.prisma.product.findUnique({where: {id}})
    if(!product) throw new NotFoundException("Product not found!")
    return this.prisma.product.delete({ where: { id }});
  }
}
