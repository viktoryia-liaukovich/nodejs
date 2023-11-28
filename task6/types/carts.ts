import { Model } from "sequelize";

export interface CartItemEntity {
  productId: string;
  count: number;
};

export interface CartModel extends Model {
  id: string;
  isDeleted?: boolean;
  items: CartItemEntity[];
  userId: string;
};