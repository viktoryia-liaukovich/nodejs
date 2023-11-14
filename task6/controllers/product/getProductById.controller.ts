import { Request, Response } from "express";
import { findProductById } from "../../repositories/products.repository";

export async function getProductById(req: Request, res: Response) {
    const { productId } = req.params;
    const foundProduct = await findProductById(productId);

    if (!foundProduct) {
        res.status(404).send(`Product with id ${productId} not found`);
    }
    res.send(foundProduct);
}