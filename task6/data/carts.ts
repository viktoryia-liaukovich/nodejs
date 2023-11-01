import { ProductEntity } from "./products";

export interface CartItemEntity {
  product: ProductEntity;
  count: number;
}

export interface CartEntity {
  id: string;
  isDeleted?: boolean;
  items: CartItemEntity[];
}

export type Carts = Record<string, CartEntity>;

// soft-delete approach is used. Carts are saved, but marked as deleted
export const deletedCarts: Record<string, CartEntity[]> = {};

// userId -> current cart for userId
export const currentUserCarts: Carts = {};