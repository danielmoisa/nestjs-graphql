import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CreateProductInput {
    @Field()
    name: string;

    @Field()
    price: number;

    @Field()
    description: string;

    @Field()
    image: string;

    @Field()
    brand: string;
}
