import Order from "../models/order";

export default {
  up() {
    return [];
  },
  down() {
    return Order.collection.drop();
  }
};
