import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentResolver } from './payment.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [PaymentResolver, PaymentService, PrismaService, ConfigService]
})
export class PaymentModule {}
