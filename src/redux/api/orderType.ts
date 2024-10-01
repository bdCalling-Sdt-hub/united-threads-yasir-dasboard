import { TProduct } from "@/types/productType";
import { TUser } from "@/types/userType";

export type TOrder = {
  _id: string;
  user: TUser;
  product: TProduct;
  quantity: number;
  amount: number;
  status: string;
  orderType: TOrderType;
  paymentStatus: TPaymentStatus;
  duoAmount: number;
  country: string;
  state: TOrderStatus;
  city: string;
  houseNo: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TOrderStatus = "PENDING" | "SHIPPED" | "DELIVERED" | "CANCELED";

export type TOrderType = "SHOP" | "QUOTE";
export type TPaymentStatus = "PAID" | "UNPAID" | "PARTIALLY_PAID";
