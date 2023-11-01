import { CartItemEntity } from "./carts";

export enum ORDER_STATUS {
  created = 'created',
  completed = 'completed'
};

export interface OrderEntity {
  id: string,
  userId: string;
  cartId: string;
  items: CartItemEntity[] // products from CartEntity
  payment: {
    type: string,
    address?: string,
    creditCard?: string,
  },
  delivery: {
    type: string,
    address: string,
  },
  comments: string,
  status: ORDER_STATUS;
  total: number;
}

// userId -> orders list for userId
export const orders: Record<string, OrderEntity[]> = {};
