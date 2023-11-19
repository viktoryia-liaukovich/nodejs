import { faker } from "@faker-js/faker";
import { v4 as uuid } from 'uuid';
import Product, { IProduct } from "../models/products";

export default {
  up() {
    const products = new Array(3).fill(null).map(() => new Product<IProduct>({
      id: uuid(),
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.number.int({ min: 1, max: 100 }),
    }));

    return products;
  },
  down() {
    return Product.collection.drop();
  }
};
