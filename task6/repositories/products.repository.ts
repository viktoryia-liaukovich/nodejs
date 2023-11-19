import Product, { IProduct } from "../models/products";

export function getProducts(): Promise<IProduct[]> {
    return Product.find({});
};

export function findProductById(id: string): Promise<IProduct | null> {
    return Product.findOne({id}).exec();
}