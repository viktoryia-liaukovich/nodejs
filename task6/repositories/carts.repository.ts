import { CartModel} from "../types/carts";
import { v4 as uuid } from "uuid";
import { ORDER_STATUS } from "../types/orders";
import { updateUser } from "./users.repository";
import { getProducts } from "./products.repository";
import Cart, { ICart } from "../models/cart";
import Order from "../models/order";
import { IProduct } from "../models/products";

export const getCartById = (id?: string): Promise<ICart | null> => {
  if (!id) {
    return Promise.resolve(null);
  }
  return Cart.findOne({id}).exec();
};

export const updateCart = async (cart: CartModel) => {
  return Cart.updateOne({id: cart.id}, cart);
};

export const clearUserCart = async (cartId?: string, isDeleted?: boolean) => {
  if (!cartId) {
    return;
  }
  const cart = await getCartById(cartId);

  if (!cart) {
    return;
  }

  if (isDeleted) {
    cart.isDeleted = true;
    const newCart = await Cart.create({
      id: uuid(),
      userId: cart.userId,
    });
    await updateUser(cart.userId, newCart.id);
  } else {
    cart.items = [];
  }

  await updateCart(cart);
};

export const performCheckoutUserCart = async (cartId?: string) => {
  if (!cartId) {
    return null;
  }
  const cart = await getCartById(cartId);

  if (cart?.items.length) {
    const products = await getProducts();

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
        const product = products.find((prod: IProduct) => prod.id === item.productId);
        acc += item.count * (product?.price || 0);
        return acc;
      }, 0),
    };

    const orderObj = await Order.create(order);

    // empty cart and create new cart uuid
    await clearUserCart(cartId, true);

    return orderObj;
  } else {
    return null;
  }
};

