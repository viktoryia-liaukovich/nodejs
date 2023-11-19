import { faker } from "@faker-js/faker";
import { v4 as uuid } from "uuid";
import Cart, { ICart } from "../models/cart";

export default {
  up () {
    const carts = new Array(3).fill(null).map(() => new Cart<ICart>({
      id: uuid(),
      userId: 'userId',
      isDeleted: false,
      items: []
    }));

    return carts;
  },

  down () {
    return Cart.collection.drop();
  }
};
