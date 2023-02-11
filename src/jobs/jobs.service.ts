import { Injectable, NotFoundException } from '@nestjs/common';
import { Job } from '@prisma/client';
import { CreateJobInput, UpdateJobInput } from '../graphql';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JobsService {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  async create(createJobInput: CreateJobInput): Promise<Job> {
    return await this.prisma.job.create({
      data: createJobInput
    })
  }

  async findAll(): Promise<Job[]> {
    return await this.prisma.job.findMany();
  }

  async findOne(id: number): Promise<Job> {
    const job = await this.prisma.job.findUnique({ where: { id } });
    if(!job) throw new NotFoundException("Job not found!");
    return job;
  }

  async update(id: number, updateJobInput: UpdateJobInput): Promise<Job> {
    const job = await this.prisma.job.findUnique({ where: { id } });
    if(!job) throw new NotFoundException("Job not found!");

    return await this.prisma.job.update({
      where: { id},
      data: updateJobInput
    })
  }

  async remove(id: number): Promise<Job> {
    const job = await this.prisma.job.findUnique({ where: { id } });
    if(!job) throw new NotFoundException("Job not found!");
    return await this.prisma.job.delete({ where: { id}})
  }
}
