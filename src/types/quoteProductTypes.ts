import { TCategory } from "./categoryTypes";

export type TQuoteProduct = {
  _id: string;
  name: string;
  frontSide: string;
  backSide: string;
  pantoneColor: string;
  category: TCategory;
  hexColor: string;
  colorsPreferences: string[];
  stock: number;
  size: string[];
  isDeleted: boolean;
  images: TImage[];
  createdAt: string;
  updatedAt: string;
  orderCount: number;
};

export type TImage = {
  url: string;
  key: string;
};
