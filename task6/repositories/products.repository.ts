import { ProductModel } from "../types/products";
import { sequelize } from "../models";

export function getProducts(): Promise<ProductModel[]> {
    return sequelize.models.Products.findAll();
};

export function findProductById(id: string): Promise<ProductModel> {
    return sequelize.models.Products.findByPk(id);
}