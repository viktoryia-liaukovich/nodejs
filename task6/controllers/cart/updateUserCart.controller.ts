import { Request, Response } from 'express';
import { getCartByUserId } from '../../repositories/carts.repository';
import { findProductById } from '../../repositories/products.repository';
import Joi from 'joi';

const putSchema = Joi.object({
    productId: Joi.string()
        .uuid()
        .length(36)
        .required(),

    count: Joi
      .number()
      .min(0)
});

export function updateUserCart(req: Request, res: Response) {
  const userId = req.headers['x-user-id'] as string;
  const body = req.body;

  const putData = putSchema.validate(body);

  if (putData.error) {
    res.status(400).send(`Products are not valid: ${putData.error.message}` );
    return;
  }

  const userCart = getCartByUserId(userId);

  const itemToUpdate = userCart.items?.find((item) => item.product.id === putData.value.productId);

  if (itemToUpdate) {
    itemToUpdate.count = putData.value.count;
  } else {
    const product = findProductById(putData.value.productId);
    userCart.items = userCart.items || [];
    userCart.items.push({product, count: putData.value.count});
  }

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