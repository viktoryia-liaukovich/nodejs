export interface CartItemEntity {
  productId: string;
  count: number;
};

export interface CartModel {
  id: string;
  isDeleted?: boolean;
  items: CartItemEntity[];
  userId: string;
};