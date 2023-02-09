
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateProductInput {
    name?: Nullable<string>;
    price?: Nullable<number>;
    description?: Nullable<string>;
    image?: Nullable<string>;
    brand?: Nullable<string>;
}

export interface UpdateProductInput {
    id?: Nullable<number>;
    name?: Nullable<string>;
    price?: Nullable<number>;
    description?: Nullable<string>;
    image?: Nullable<string>;
    brand?: Nullable<string>;
}

export interface Product {
    id?: Nullable<string>;
    name?: Nullable<string>;
    price?: Nullable<number>;
    description?: Nullable<string>;
    image?: Nullable<string>;
    brand?: Nullable<string>;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
}

export interface IQuery {
    products(): Nullable<Product>[] | Promise<Nullable<Product>[]>;
    product(id: number): Nullable<Product> | Promise<Nullable<Product>>;
}

export interface IMutation {
    createProduct(createProductInput: CreateProductInput): Product | Promise<Product>;
    updateProduct(updateProductInput: UpdateProductInput): Product | Promise<Product>;
    removeProduct(id: number): Nullable<Product> | Promise<Nullable<Product>>;
}

type Nullable<T> = T | null;
