import { Request, Response } from "express";
import { getProducts } from "../../repositories/products.repository";

export function getProductsList(req: Request, res: Response) {
    const products = getProducts();
    res.status(200).send({
        data: Object.values(products),
        error: null
        },
    );;
}