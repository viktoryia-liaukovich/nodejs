import { products } from "../data/products";

export function getProducts() {
    return products;
};

export function findProductById(id: string) {
    return products[id];
}