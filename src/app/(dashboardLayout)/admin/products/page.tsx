import ProductsContainer from "@/components/dashboardLayout/products/ProductsContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Products | United Threads ",
    template: "%s | United Threads",
  },
  description: "Generated by create next app",
};

const ProductPage = () => {
  return (
    <div>
      <ProductsContainer></ProductsContainer>
    </div>
  );
};

export default ProductPage;
