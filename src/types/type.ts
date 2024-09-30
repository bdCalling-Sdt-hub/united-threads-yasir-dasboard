export type TProduct = {
  _id: string;
  name: string;
  category: string;
  price: number;
  shortDescription: string;
  description: string;
  image: string;
  salesCount: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
};

export type TQuoteProduct = {
  _id: string;
  name: string;
  category: string;
  shortDescription: string;
  image: string;
};
