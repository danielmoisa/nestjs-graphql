
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

export interface RegisterUserInput {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    profilePictureUrl: string;
    emailIsVerified: boolean;
    companyId?: Nullable<number>;
    subscriptionId?: Nullable<number>;
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

export interface CreateUserInput {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    profilePictureUrl: string;
    emailIsVerified: boolean;
    companyId?: Nullable<number>;
    subscriptionId?: Nullable<number>;
}

export interface UpdateUserInput {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    profilePictureUrl: string;
    emailIsVerified: boolean;
    companyId?: Nullable<number>;
    subscriptionId?: Nullable<number>;
}

export interface IQuery {
    getCurrentUser(): Nullable<User> | Promise<Nullable<User>>;
    jobs(): Nullable<Job>[] | Promise<Nullable<Job>[]>;
    job(id: number): Nullable<Job> | Promise<Nullable<Job>>;
    users(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    user(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    registerUser(registerUserInput: RegisterUserInput): Nullable<User> | Promise<Nullable<User>>;
    createJob(createJobInput: CreateJobInput): Job | Promise<Job>;
    updateJob(updateJobInput: UpdateJobInput): Job | Promise<Job>;
    removeJob(id: number): Nullable<Job> | Promise<Nullable<Job>>;
    createCheckoutSession(items: CreateSessionInput[]): Nullable<CreateSessionResponseDto> | Promise<Nullable<CreateSessionResponseDto>>;
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
    updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;
    removeUser(id: number): Nullable<User> | Promise<Nullable<User>>;
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

export interface CreateSessionResponseDto {
    url: string;
}

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    profilePictureUrl: string;
    emailIsVerified: boolean;
    companyId?: Nullable<number>;
    subscriptionId?: Nullable<number>;
}

export type DateTime = any;
type Nullable<T> = T | null;
