import { Request, Response } from "express";
import { getProducts } from "../../repositories/products.repository";

export async function getProductsList(req: Request, res: Response) {
    const products = await getProducts();

    res.status(200).send({
        data: Object.values(products),
        error: null
    });
}