import { Schema, model } from 'mongoose';

export interface ICart {
  id: string;
  userId: string;
  isDeleted: boolean;
  items: { productId: string; count: number }[];
}

const productSchema = new Schema<ICart>({
  id: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    required: false,
    default: false
  },
  items: {
    type: [{ productId: String, count: Number }],
    required: true,
  },
});

const Cart = model("Cart", productSchema);

export default Cart;