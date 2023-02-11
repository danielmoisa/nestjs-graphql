import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from '../prisma/prisma.service';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthResolver } from './auth.resolver';

@Module({
  imports:[
    UsersModule,
    PassportModule.register({
      defaultStrategy: "jwt"
    }),
    JwtModule.registerAsync({
     useFactory: async (config: ConfigService) => ({
      secret: config.get("jwtSecret"),
      signOptions: { expiresIn: "3600s"}
     }),
     inject: [ConfigService],
    }),
  ],
  providers: [AuthService, PrismaService, ConfigService, JwtStrategy, AuthResolver]
})
export class AuthModule {}
