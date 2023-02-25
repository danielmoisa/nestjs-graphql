import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config/dist';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { PrismaService } from './prisma/prisma.service';
import { PaymentModule } from './payment/payment.module';
import { JobsModule } from './jobs/jobs.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import configuration from './commons/configuration';
import { join } from 'path';

@Module({
  imports:[
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    GraphQLModule.forRootAsync({
    driver: ApolloDriver,
    useFactory: (config: ConfigService) => {
      return {
        cors: {
          origin: [config.get("apolloPlaygroundUrl"), config.get("clientUrl")],
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
  PaymentModule,
  JobsModule,
  AuthModule,
  UsersModule
],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
