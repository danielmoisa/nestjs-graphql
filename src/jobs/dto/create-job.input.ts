import { Field, ObjectType } from "@nestjs/graphql";
import { JobType } from "@prisma/client";

@ObjectType()
export class CreateJobInput {
    @Field()
    title: string;

    @Field()
    experience: number;

    @Field()
    description: string;

    @Field()
    imageUrl: string;

    @Field()
    type: JobType
}
