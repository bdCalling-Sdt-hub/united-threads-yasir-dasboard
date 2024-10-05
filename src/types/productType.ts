export type TProduct = {
  _id: string;
  user: string;
  name: string;
  description: string;
  shortDescription: string;
  images: {
    url: string;
    key: string;
  };
  primaryImage?: string;
  category: string;
  quantity: number;
  price: number;
  size: string[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  orderCount: number;
  colorsPreferences: string[]; // hex colors array;
};
