
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateProductInput {
    exampleField?: Nullable<number>;
}

export interface UpdateProductInput {
    id: number;
}

export interface Product {
    exampleField?: Nullable<number>;
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
