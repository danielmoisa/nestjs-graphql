import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config/dist';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { join } from 'path';
import { PrismaService } from './prisma/prisma.service';
import { PaymentModule } from './payment/payment.module';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports:[GraphQLModule.forRootAsync({
    driver: ApolloDriver,
    useFactory: (config: ConfigService) => {
      return {
        cors: {
          origin: config.get("APOLLO_PLAYGROUND_URL"),
          credentials: true,
        },
        typePaths: ['./**/*.graphql'],
        definitions: {
          path: join(process.cwd(), 'src/graphql.ts'),
        },
        playground: false,
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
      }
    },
    inject: [ConfigService]
  }),
  ConfigModule.forRoot({isGlobal: true}),
  PaymentModule,
  JobsModule
],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
