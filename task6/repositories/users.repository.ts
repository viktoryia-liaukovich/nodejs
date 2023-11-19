import User from "../models/user";

export const getUserById = (id: string) => {
  return User.findOne({id}).exec();
}

export const updateUser = async (userId: string, cartId: string) => {
  const user = await getUserById(userId);
  if (!user) {
    return;
  }
  return User.updateOne({id: user.id}, {cartId});
}