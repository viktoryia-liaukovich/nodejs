import { Schema, model } from 'mongoose';

export interface IUser {
  id: string;
  email: string;
  password: string;
  role?: 'user' | 'admin';
  cartId: string;
  accessToken?: string;
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
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user'
  },
});

const User = model("User", userSchema);

export default User;