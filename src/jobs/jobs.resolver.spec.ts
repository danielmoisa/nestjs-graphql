import { Test, TestingModule } from '@nestjs/testing';
import { JobsResolver } from './jobs.resolver';
import { JobsService } from './jobs.service';

describe('JobsResolver', () => {
  let resolver: JobsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobsResolver, JobsService],
    }).compile();

    resolver = module.get<JobsResolver>(JobsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
