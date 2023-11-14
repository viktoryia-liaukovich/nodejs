import { sequelize } from "../models";

export const getUserById = (id: string) => {
  return sequelize.models.User.findByPk(id);
}

export const updateUser = async (userId: string, cartId: string) => {
  const user = await getUserById(userId);
  user.cartId = cartId;
  return user.save();
}