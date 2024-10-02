"use client";
import { Button, Segmented } from "antd";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import AddCetagoryModal from "./AddCetagoryModal";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
import { useGetProductsQuery } from "@/redux/api/productApi";
import { TResponse } from "@/types/global";
import { TCategory } from "@/types/categoryTypes";
import { TProduct } from "@/types/productType";

const ProductsContainer = () => {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const { data: categoryData, isLoading: categoriesLoading } = useGetCategoriesQuery({});
  const result = categoryData as TResponse<TCategory[]>;

  // Get categories and map them into an array
  const categories: TCategory[] = result?.data || [];
  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category._id,
  }));

  // Add 'ALL' category manually at the start
  const allCategories = [{ label: "ALL", value: "ALL" }, ...categoryOptions];

  // Define visible categories to enable scrolling
  const [visibleCategories, setVisibleCategories] = useState(allCategories.slice(0, 6));

  const handleRightClick = () => {
    setVisibleCategories((prev) => {
      const nextIndex = (allCategories.indexOf(prev[prev.length - 1]) + 1) % allCategories.length;
      return [...prev.slice(1), allCategories[nextIndex]];
    });
  };

  const handleLeftClick = () => {
    setVisibleCategories((prev) => {
      const prevIndex =
        (allCategories.indexOf(prev[0]) - 1 + allCategories.length) % allCategories.length;
      return [allCategories[prevIndex], ...prev.slice(0, -1)];
    });
  };

  // Fetch products based on the selected category (or all if selectedCategory is 'ALL')
  const { data: productData, isLoading: productIsLoading } = useGetProductsQuery([
    {
      label: "category",
      value: selectedCategory,
    },
  ]);

  const products: TProduct[] = productData?.data || [];

  useEffect(() => {
    if (!categoriesLoading && result?.data?.length) {
      setVisibleCategories(allCategories.slice(0, 6));
    }
  }, [categoryData]);

  return (
    <>
      <div className='space-y-6'>
        <div>
          <Button
            className='w-full bg-[#232323] text-[#fff] font-semibold !py-6 uppercase'
            icon={<CiCirclePlus size={20} color='#fff' />}
            onClick={() => setOpen(true)}
          >
            Add New Category
          </Button>
          <div className='flex items-center justify-between py-4'>
            <h1 className='text-2xl font-bold w-full'>All Products</h1>
            <Link href={"/admin/products/addProduct"}>
              <Button
                className='bg-[#232323] text-[#fff] min-w-48 !py-5'
                icon={<CiCirclePlus size={20} color='#fff' />}
              >
                Add Product
              </Button>
            </Link>
          </div>
          <div className='w-full flex items-center gap-x-6'>
            <Button onClick={handleLeftClick} className='bg-[#232323] text-[#fff] !py-5'>
              <FaChevronLeft size={24} />
            </Button>
            <Segmented
              options={visibleCategories}
              value={selectedCategory}
              onChange={(value) => setSelectedCategory(value as string)}
              block
              className='w-full'
            />
            <Button onClick={handleRightClick} className='bg-[#232323] text-[#fff] !py-5'>
              <FaChevronRight size={24} />
            </Button>
          </div>
        </div>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {productIsLoading ? (
            <p>Loading products...</p>
          ) : (
            products.map((product) => <ProductCard key={product._id} product={product} />)
          )}
        </div>
      </div>
      <AddCetagoryModal open={open} setOpen={setOpen}></AddCetagoryModal>
    </>
  );
};

export default ProductsContainer;
