
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum JobType {
    REMOTE = "REMOTE",
    ONSITE = "ONSITE"
}

export interface CreateJobInput {
    title: string;
    experience: number;
    description: string;
    imageUrl: string;
    type: JobType;
    userId?: Nullable<number>;
    companyId?: Nullable<number>;
}

export interface UpdateJobInput {
    id: number;
    title: string;
    experience: number;
    description: string;
    imageUrl: string;
    type: JobType;
    userId?: Nullable<number>;
    companyId?: Nullable<number>;
}

export interface CreateSessionInput {
    id: number;
    quantity: number;
}

export interface Job {
    id: string;
    title: string;
    experience: number;
    description: string;
    imageUrl: string;
    type: JobType;
    createdAt: DateTime;
    updatedAt: DateTime;
    userId?: Nullable<number>;
    companyId?: Nullable<number>;
}

export interface IQuery {
    jobs(): Nullable<Job>[] | Promise<Nullable<Job>[]>;
    job(id: number): Nullable<Job> | Promise<Nullable<Job>>;
}

export interface IMutation {
    createJob(createJobInput: CreateJobInput): Job | Promise<Job>;
    updateJob(updateJobInput: UpdateJobInput): Job | Promise<Job>;
    removeJob(id: number): Nullable<Job> | Promise<Nullable<Job>>;
    createCheckoutSession(items: CreateSessionInput[]): Nullable<CreateSessionResponseDto> | Promise<Nullable<CreateSessionResponseDto>>;
}

export interface CreateSessionResponseDto {
    url: string;
}

export type DateTime = any;
type Nullable<T> = T | null;
