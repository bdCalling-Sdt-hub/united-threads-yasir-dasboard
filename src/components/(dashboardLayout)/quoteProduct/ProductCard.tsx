import productImg from "@/assets/product.svg";
import Image from "next/image";
import { TQuoteProduct } from "@/types/type";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const ProductCard = ({ product }: { product: TQuoteProduct }) => {
  return (
    <div
      className={`p-4 border border-primaryBlack rounded-xl font-roboto space-y-4 relative`}
    >
      <div className="flex items-center gap-4">
        <Image src={productImg} alt={product.name} width={84} height={84} />
        <div>
          <div className=" flex flex-col gap-3">
            <h1 className="text-xl font-bold">{product.name}</h1>
          </div>
        </div>
      </div>

      {/* delete and esit btn */}
      <div className="mt-2 flex gap-1 absolute top-0 right-2">
        <div className="p-3 bg-red-500 rounded-full">
          <FiTrash2 color="#fff" size={16} />
        </div>
        <div className="p-3 bg-green-500 rounded-full">
          <FiEdit color="#fff" size={16} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold">Short Description</h3>
        <p>{product.shortDescription}</p>
      </div>
    </div>
  );
};

export default ProductCard;
