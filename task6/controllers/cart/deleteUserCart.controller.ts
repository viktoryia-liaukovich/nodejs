import { Request, Response } from 'express';
import { clearUserCart } from '../../repositories/carts.repository';

export function deleteUserCart(req: Request, res: Response) {
  const userId = req.headers['x-user-id'] as string;

  clearUserCart(userId);

  res.status(200).json({
    data: {
      success: true
    },
    error: null
  });
}