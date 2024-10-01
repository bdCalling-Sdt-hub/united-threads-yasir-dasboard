export type TProduct = {
  _id: string;
  user: string;
  name: string;
  description: string;
  shortDescription: string;
  images: string[];
  image?: string;
  category: string;
  quantity: number;
  price: number;
  size: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};
