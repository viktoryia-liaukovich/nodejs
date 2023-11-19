import { Schema, model } from 'mongoose';

export interface IOrder {
  id: string;
  userId: string;
  cartId: string;
  items: { productId: string; count: number }[],
  total: number;
}

const productSchema = new Schema<IOrder>({
  id: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  cartId: {
    type: String,
    required: true,
  },
  items: {
    type: [{ productId: String, count: Number }],
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

const Order = model("Order", productSchema);

export default Order;