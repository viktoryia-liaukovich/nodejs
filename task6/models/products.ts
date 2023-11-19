import { Schema, model } from 'mongoose';

export interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
}

const productSchema = new Schema<IProduct>({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Product = model("Product", productSchema);

export default Product;