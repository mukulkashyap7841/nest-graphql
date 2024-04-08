
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateUserInput {
    id?: Nullable<number>;
    created_at?: Nullable<DateTime>;
    name: string;
    email: string;
}

export interface UserEntity {
    id?: Nullable<number>;
    created_at?: Nullable<DateTime>;
    created_on?: Nullable<string>;
    name: string;
    email: string;
}

export interface IQuery {
    users(): UserEntity[] | Promise<UserEntity[]>;
    user(id: string): Nullable<UserEntity> | Promise<Nullable<UserEntity>>;
}

export interface IMutation {
    addUser(createUserInput: CreateUserInput): Nullable<UserEntity> | Promise<Nullable<UserEntity>>;
}

export type DateTime = any;
type Nullable<T> = T | null;
