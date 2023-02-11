import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { JobsService } from './jobs.service';
import { CreateJobInput } from './dto/create-job.input';
import { UpdateJobInput } from './dto/update-job.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';

@UseGuards(GqlAuthGuard)
@Resolver('Job')
export class JobsResolver {
  constructor(private readonly jobsService: JobsService) {}

  @Mutation('createJob')
  async create(@Args('createJobInput') createJobInput: CreateJobInput) {
    return await this.jobsService.create(createJobInput);
  }

  @Query('jobs')
  async findAll() {
    return await this.jobsService.findAll();
  }

  @Query('job')
  async findOne(@Args('id') id: number) {
    return await this.jobsService.findOne(id);
  }

  @Mutation('updateJob')
 async update(@Args('updateJobInput') updateJobInput: UpdateJobInput) {
    return await this.jobsService.update(updateJobInput.id, updateJobInput);
  }

  @Mutation('removeJob')
  async remove(@Args('id') id: number) {
    return await this.jobsService.remove(id);
  }
}
