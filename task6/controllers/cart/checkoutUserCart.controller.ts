import { Request, Response } from 'express';
import { performCheckoutUserCart } from '../../repositories/carts.repository';

export function checkoutUserCart(req: Request, res: Response) {
  const userId = req.headers['x-user-id'] as string;

  const order = performCheckoutUserCart(userId);

  if (!order) {
    res.status(400).send('Cart is empty');
    return;
  }

  res.status(200).json({
    data: {
      order,
    },
    error: null
  });
}