import { Request, Response } from 'express';
import { getCartById } from '../../repositories/carts.repository';
import { getUserById } from '../../repositories/users.repository';
import { getProducts } from '../../repositories/products.repository';

export async function getUserCart(req: Request, res: Response) {
  const userId = req.headers['x-user-id'] as string;

  const user = await getUserById(userId);
  const userCart = await getCartById(user?.cartId);

  if (!userCart) {
    res.status(404).send(`User cart with id ${user?.cartId} not found`);
    return;
  }

  const allProducts = await getProducts();

  const totalCount = userCart.items.reduce((acc, item) => {
    const product = allProducts.find((product) => product.id === item.productId);

    acc += item.count * (product?.price || 0);
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