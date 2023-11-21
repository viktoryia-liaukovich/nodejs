import { v4 as uuid } from "uuid";
import { faker } from "@faker-js/faker";
import User, { IUser } from "../models/user";
import { ICart } from "../models/cart";
import bcrypt from 'bcrypt';

export default {
  up(entities: ICart[]) {
    const carts = entities.filter((entity) => 'isDeleted' in entity);

    const users = new Array(carts.length).fill(null).map((user, i) => {
      const userId = uuid();

      carts[i].userId = userId;

      // Mocked password
      const password = userId.replace('-', '');

      const passwordHash = bcrypt.hashSync(password, 10);

      return new User<IUser>({
        id: userId,
        email: faker.internet.email(),
        password: passwordHash,
        cartId: carts[i].id,
      });
    });

    return users;
  },
  down() {
    return User.collection.drop();
  }
};
