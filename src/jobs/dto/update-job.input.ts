import { CreateJobInput } from './create-job.input';
import { PartialType } from '@nestjs/mapped-types';
import { ObjectType, Field } from '@nestjs/graphql';
import { JobType } from '@prisma/client';

@ObjectType()
export class UpdateJobInput extends PartialType(CreateJobInput) {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field()
  experience: number;

  @Field()
  description: string;

  @Field()
  imageUrl: string;

  @Field()
  type: JobType
}
