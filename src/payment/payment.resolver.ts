import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { PaymentService } from './payment.service';
import { CreateSessionResponseDto } from './dto/create-session.response';
import { CreateSessionInput } from './dto/create-session-input.dto';

@Resolver('Payment')
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Mutation('createCheckoutSession')
  async createCheckoutSession(@Args({ name: "items", type: () => [CreateSessionInput]}) createPaymentInput: CreateSessionInput[]): Promise<CreateSessionResponseDto | undefined | void> {
    return this.paymentService.createCheckoutSession(createPaymentInput);
  }
}
