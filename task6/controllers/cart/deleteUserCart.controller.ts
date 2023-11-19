import { Request, Response } from 'express';
import { clearUserCart } from '../../repositories/carts.repository';
import { getUserById } from '../../repositories/users.repository';

export async function deleteUserCart(req: Request, res: Response) {
  const userId = req.headers['x-user-id'] as string;

  const user = await getUserById(userId);

  await clearUserCart(user?.cartId);

  res.status(200).json({
    data: {
      success: true
    },
    error: null
  });
}