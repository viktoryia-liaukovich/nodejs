import { faker } from "@faker-js/faker";
import { define } from "typeorm-seeding";

import { Product } from "../../entities";

define(Product, () => {
  const product = new Product();

  product.title = faker.commerce.productName();
  product.description = faker.commerce.productDescription();
  product.price = faker.number.int({ min: 1, max: 100 });

  return product;
});