import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config/dist';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { ProductsModule } from './products/products.module';
import { PaymentModule } from './payment/payment.module';

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
  ProductsModule,
  PaymentModule
],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
