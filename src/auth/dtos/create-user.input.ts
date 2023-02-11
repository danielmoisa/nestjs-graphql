import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CreateUserInput {
    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field()
    profilePictureUrl: string;

    @Field()
    emailIsVerified: boolean;

    @Field()
    companyId: number;

    @Field()
    subscriptionId: number;
}
