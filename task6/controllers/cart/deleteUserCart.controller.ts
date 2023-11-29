import { Request, Response } from 'express';
import { clearUserCart } from '../../repositories/carts.repository';
import { getUserById } from '../../repositories/users.repository';
import { Log } from '../../utils/logger';

export async function deleteUserCart(req: Request, res: Response) {
  const userId = req.headers['x-user-id'] as string;

  const user = await getUserById(userId);

  await clearUserCart(user?.cartId);

  Log(`Cart of user ${userId} cleared successfully`);

  res.status(200).json({
    data: {
      success: true
    },
    error: null
  });
}