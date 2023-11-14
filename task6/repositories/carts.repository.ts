import { CartModel} from "../types/carts";
import { v4 as uuid } from "uuid";
import { ORDER_STATUS } from "../types/orders";
import { sequelize } from "../models";
import { updateUser } from "./users.repository";
import { getProducts } from "./products.repository";
import { ProductModel } from "../types/products";

export const getCartById = (id: string): Promise<CartModel> => {
  return sequelize.models.Cart.findByPk(id);
};

export const updateCart = async (cart: CartModel) => {
  cart.changed('items', true);
  return cart.save();
};

export const clearUserCart = async (cartId: string, isDeleted?: boolean) => {
  const cart = await getCartById(cartId);

  if (isDeleted) {
    cart.isDeleted = true;
    const newCart = await sequelize.models.Cart.create({
      id: uuid(),
      userId: cart.userId,
    });
    await updateUser(cart.userId, newCart.id);
  } else {
    cart.items = [];
  }

  await updateCart(cart);
};

export const performCheckoutUserCart = async (cartId: string) => {
  const cart = await getCartById(cartId);

  if (cart?.items.length) {
    const products = await getProducts();

    console.log('CART', cart.toJSON());

    const order = {
      id: uuid(),
      userId: cart.userId,
      cartId: cart.id,
      items: cart.items,
      payment: {
        type: 'paypal',
        address: 'London',
        creditCard: '1234-1234-1234-1234'
      },
      delivery: {
        type: 'post',
        address: 'London'
      },
      comments: '',
      status: ORDER_STATUS.created,
      total: cart.items.reduce((acc, item) => {
        const product = products.find((prod: ProductModel) => prod.id === item.productId);
        acc += item.count * (product?.price || 0);
        return acc;
      }, 0),
    };

    const orderObj = await sequelize.models.Order.create(order);

    // empty cart and create new cart uuid
    await clearUserCart(cartId, true);

    return orderObj;
  } else {
    console.log('NULL');

    return null;
  }
};

