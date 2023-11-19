import { Schema, model } from 'mongoose';

export interface IUser {
  id: string;
  cartId: string;
}

const userSchema = new Schema<IUser>({
  id: {
    type: String,
    required: true,
  },
  cartId: {
    type: String,
    required: true,
  },
});

const User = model("User", userSchema);

export default User;