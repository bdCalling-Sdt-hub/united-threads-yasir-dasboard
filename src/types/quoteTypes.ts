/* eslint-disable @typescript-eslint/no-explicit-any */
import { TCategory } from "./categoryTypes";
import { TUser } from "./userType";

export type TQuote = {
  _id: string;
  name: string;
  user: TUser;
  frontSide: string;
  backSide: string;
  pantoneColor: string;
  category: TCategory;
  hexColor: string;
  colorsPreferences: string[];
  size: string;
  isDeleted: boolean;
  images: any[];
  quantity: number;
  materialPreferences: string;
  quoteStatus?: TQuoteStatus;
  isAccepted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TQuoteStatus = "pending" | "processing" | "completed" | "canceled";
