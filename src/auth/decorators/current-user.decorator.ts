import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '@prisma/client';

export const getCurrentUserByContext = (context: ExecutionContext): User | undefined => {

  if (context.getType() === 'http') {
    return context.switchToHttp().getRequest().user;
  }
  if ((context.getType() as any) === 'graphql') {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  }
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);