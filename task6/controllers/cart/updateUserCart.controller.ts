import { Request, Response } from 'express';
import { getCartById, updateCart } from '../../repositories/carts.repository';
import { getProducts } from '../../repositories/products.repository';
import Joi from 'joi';
import { getUserById } from '../../repositories/users.repository';

const putSchema = Joi.object({
    productId: Joi.string()
        .uuid()
        .length(36)
        .required(),

    count: Joi
      .number()
      .min(0)
});

export async function updateUserCart(req: Request, res: Response) {
  const userId = req.headers['x-user-id'] as string;
  const body = req.body;

  const putData = putSchema.validate(body);

  if (putData.error) {
    res.status(400).send(`Products are not valid: ${putData.error.message}` );
    return;
  }

  const { productId, count } = putData.value;

  const user = await getUserById(userId);
  const userCart = await getCartById(user.cartId);

  const itemToUpdate = userCart.items.find((item) => item.productId === productId);

  if (itemToUpdate) {
    itemToUpdate.count = count;
  } else {
    userCart.items.push({ productId, count });
  }

  userCart.items = JSON.parse(JSON.stringify(userCart.items));

  const updatedCart = await updateCart(userCart);

  const products = await getProducts();

  const totalCount = userCart.items.reduce((acc, item) => {
    const product = products.find((prod) => prod.id === item.productId);
    acc += item.count * (product?.price || 0);
    return acc;
  }, 0);

  res.status(200).json({
    data: {
      cart: updatedCart,
      total: totalCount || 0
    },
    error: null
  });
}