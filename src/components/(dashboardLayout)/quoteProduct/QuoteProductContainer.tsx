"use client";
import { TQuoteProduct } from "@/types/type";
import { Button, Segmented } from "antd";
import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FaChevronLeft } from "react-icons/fa6";
import ProductCard from "./ProductCard";
import AddCetagoryModal from "./AddCetagoryModal";
import AddQuoteProduct from "./AddQuoteProduct";

const QuoteProductContainer = () => {
  const [open, setOpen] = useState(false);
  const [openAddProdct, setOpenAddProdct ] = useState(false);
  const [allCategories] = useState([
    "ALL",
    "PANT",
    "CLOTH",
    "WATCH",
    "COSMETICS",
    "JEWELRY",
    "SUNGLASSES",
    "CATEGORY",
  ]);

  const [visibleCategories, setVisibleCategories] = useState([
    "ALL",
    "PANT",
    "CLOTH",
    "WATCH",
    "COSMETICS",
    "JEWELRY",
  ]);

  const handleRightClick = () => {
    setVisibleCategories((prev) => {
      // Remove the first category and append the next one from allCategories
      const nextIndex =
        (allCategories.indexOf(prev[prev.length - 1]) + 1) %
        allCategories.length;
      return [...prev.slice(1), allCategories[nextIndex]];
    });
  };

  const handleLeftClick = () => {
    setVisibleCategories((prev) => {
      // Remove the last category and prepend the previous one from allCategories
      const prevIndex =
        (allCategories.indexOf(prev[0]) - 1 + allCategories.length) %
        allCategories.length;
      return [allCategories[prevIndex], ...prev.slice(0, -1)];
    });
  };

  const products: TQuoteProduct[] = Array.from({ length: 5 }).map((_, inx) => ({
    _id: `${inx + 1}`,
    name: "Hoodie",
    category: "Transportation",
    shortDescription:
      "Electric scooter with a 25-mile range and foldable design.",
    image: "https://example.com/images/scooter.jpg",
  }));

  return (
    <>
      <div className="space-y-6">
        <div>
          <Button
            className="w-full bg-[#232323] text-[#fff] font-semibold !py-6 uppercase"
            icon={<CiCirclePlus size={20} color="#fff" />}
            onClick={() => setOpen(true)}
          >
            Add New Category
          </Button>
          <div className="flex items-center justify-between py-4">
            <h1 className="text-2xl font-bold w-full">All Products</h1>
            
              <Button
                className="bg-[#232323] text-[#fff] min-w-48 !py-5"
                icon={<CiCirclePlus size={20} color="#fff" />}
                onClick={()=>setOpenAddProdct(!openAddProdct)}
              >
                Add Product
              </Button>
           
          </div>
          <div className="w-full flex items-center gap-x-6">
            <Button
              onClick={handleLeftClick}
              className="bg-[#232323] text-[#fff] !py-5"
            >
              <FaChevronLeft size={24} />
            </Button>
            <Segmented options={visibleCategories} block className="w-full" />
            <Button
              onClick={handleRightClick}
              className="bg-[#232323] text-[#fff] !py-5"
            >
              <FaChevronLeft size={24} className="rotate-180" />
            </Button>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
      <AddCetagoryModal open={open} setOpen={setOpen}></AddCetagoryModal>
      <AddQuoteProduct open={openAddProdct} setOpen={setOpenAddProdct}></AddQuoteProduct>
    </>
  );
};

export default QuoteProductContainer;
