import { currentUserCarts, deletedCarts } from "../data/carts";
import { v4 as uuid } from "uuid";
import { ORDER_STATUS, orders } from "../data/orders";

export const getCartByUserId = (id: string) => {
  return currentUserCarts[id] = currentUserCarts[id] || {
    id: uuid(),
    items: []
  };
};

export const clearUserCart = (userId: string) => {
  const userCart = getCartByUserId(userId);

  const deletedUserCarts = deletedCarts[userId] = deletedCarts[userId] || [];

  deletedUserCarts.push(JSON.parse(JSON.stringify({
    ...userCart,
    isDeleted: true,
  })));

  userCart.id = uuid();
  userCart.items = [];
};

export const performCheckoutUserCart = (userId: string) => {
  const userOrders = orders[userId] = orders[userId] || [];

  const cart = currentUserCarts[userId];

  if (cart?.items.length) {
    const order = {
      id: uuid(),
      userId,
      cartId: cart.id,
      items: JSON.parse(JSON.stringify(cart.items)),
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
        acc += item.count * item.product.price;
        return acc;
      }, 0),
    };

    userOrders.push(order);

    // empty cart and create new cart uuid
    clearUserCart(userId);

    return order;
  } else {
    return null;
  }
};

