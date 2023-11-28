import { Request, Response } from 'express';
import { getCartByUserId } from '../../repositories/carts.repository';

export function getUserCart(req: Request, res: Response) {
  const userId = req.headers['x-user-id'] as string;

  const userCart = getCartByUserId(userId);
  const totalCount = userCart.items?.reduce((acc, item) => {
    acc += item.count * item.product.price;
    return acc;
  }, 0);

  res.status(200).json({
    data: {
      cart: userCart,
      total: totalCount || 0
    },
    error: null
  });
}