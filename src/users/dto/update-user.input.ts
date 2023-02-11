import { CreateUserInput } from '../../auth/dtos/create-user.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserInput extends PartialType(CreateUserInput) {
  id: number;
}
