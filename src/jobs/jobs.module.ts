import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsResolver } from './jobs.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [JobsResolver, JobsService, PrismaService]
})
export class JobsModule {}
