import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateSessionResponseDto {
    @Field()
    url: string;
}