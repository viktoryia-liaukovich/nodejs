import User, { IUser } from "../models/user";
import { v4 as uuid } from "uuid";
import { createCart } from "./carts.repository";
import bcrypt from 'bcrypt';

export const getUserById = (id: string) => {
  return User.findOne({id}).exec();
}

export const getUserByEmail = (email: string) => {
  return User.findOne({email}).exec();
}

export const createUser = async (email: string, password: string) => {
  const userId = uuid();

  const userCart = await createCart(userId);

  const passwordHash = bcrypt.hashSync(password, 10);

  const user = await User.create({
    id: userId,
    email,
    password: passwordHash,
    cartId: userCart.id,
  });

  return {
    id: user.id,
    email: user.email,
    cartId: user.cartId,
  }
}

export const updateUser = async (userId: string, data: Partial<IUser>) => {
  const user = await getUserById(userId);
  if (!user) {
    return;
  }
  return User.updateOne({id: user.id}, data);
}