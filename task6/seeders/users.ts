import { v4 as uuid } from "uuid";
import User, { IUser } from "../models/user";
import { ICart } from "../models/cart";

export default {
  up(entities: ICart[]) {
    const carts = entities.filter((entity) => 'isDeleted' in entity);

    const users = new Array(carts.length).fill(null).map((user, i) => {
      const userId = uuid();

      carts[i].userId = userId;

      return new User<IUser>({
        id: userId,
        cartId: carts[i].id,
      });
    });

    return users;
  },
  down() {
    return User.collection.drop();
  }
};
