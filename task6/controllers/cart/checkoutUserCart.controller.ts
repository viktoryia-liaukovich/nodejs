import { Request, Response } from 'express';
import { performCheckoutUserCart } from '../../repositories/carts.repository';
import { getUserById } from '../../repositories/users.repository';
import { Log } from '../../utils/logger';

export async function checkoutUserCart(req: Request, res: Response) {
  const userId = req.headers['x-user-id'] as string;

  Log(`Checkout attempt for user ${userId}`);

  const user = await getUserById(userId);
  const order = await performCheckoutUserCart(user?.cartId);

  if (!order) {
    res.status(400).send('Cart is empty');
    return;
  }

  Log(`Order with id '${order.id}' created successfully`);

  res.status(200).json({
    data: {
      order,
    },
    error: null
  });
}