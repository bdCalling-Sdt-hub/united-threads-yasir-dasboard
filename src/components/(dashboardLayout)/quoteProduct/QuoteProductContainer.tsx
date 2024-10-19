"use client";
//import { TQuoteProduct } from "@/types/type";
import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
import { useGetQuoteProductsQuery } from "@/redux/api/quoteProductApi";
import { TCategory } from "@/types/categoryTypes";
import { TResponse } from "@/types/global";
import { TQuoteProduct } from "@/types/quoteProductTypes";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Empty, Segmented, Spin } from "antd";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FaChevronLeft } from "react-icons/fa6";
import AddCategoryModal from "./AddQuoteCategoryModal";
import QuoteProductCard from "./QuoteProductCard";
import AddQuoteProduct from "./AddQuoteProduct";
import { useGetQuoteCategoriesQuery } from "@/redux/api/quoteCategoryApi";

const QuoteProductContainer = () => {
  const [open, setOpen] = useState(false);
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const { data: categoryData, isLoading: categoriesLoading } = useGetQuoteCategoriesQuery({});
  const result = categoryData as TResponse<TCategory[]>;

  // State for categories and visible categories
  const [allCategories, setAllCategories] = useState<{ label: string; value: string }[]>([
    { label: "ALL", value: "ALL" },
  ]);
  const [visibleCategories, setVisibleCategories] = useState(allCategories.slice(0, 6));

  useEffect(() => {
    if (!categoriesLoading && result?.data?.length) {
      // Add categories from API and ensure 'ALL' is only added once
      const categoryOptions = result.data.map((category) => ({
        label: category.name,
        value: category._id,
      }));

      setAllCategories([{ label: "ALL", value: "ALL" }, ...categoryOptions]);
      setVisibleCategories([{ label: "ALL", value: "ALL" }, ...categoryOptions].slice(0, 6));
    }
  }, [categoryData, result, categoriesLoading]);

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
  const { data: productData, isLoading: productIsLoading } = useGetQuoteProductsQuery([
    {
      label: "category",
      value: selectedCategory,
    },
  ]);

  const products = (productData as TResponse<TQuoteProduct[]>)?.data || [];
  console.log(products);
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

            <Button
              className='bg-[#232323] text-[#fff] min-w-48 !py-5'
              icon={<CiCirclePlus size={20} color='#fff' />}
              onClick={() => setOpenAddProduct(!openAddProduct)}
            >
              Add Product
            </Button>
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
              <FaChevronLeft size={24} className='rotate-180' />
            </Button>
          </div>
        </div>
        {productIsLoading ? (
          <div className='w-full flex justify-center h-44 items-center'>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
          </div>
        ) : !products?.length ? (
          <div className='flex justify-center w-full h-44 items-center'>
            <Empty />
          </div>
        ) : (
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full border'>
            {products?.map((product) => (
              <QuoteProductCard key={product?._id} product={product} />
            ))}
          </div>
        )}
      </div>
      <AddCategoryModal open={open} setOpen={setOpen}></AddCategoryModal>
      <AddQuoteProduct open={openAddProduct} setOpen={setOpenAddProduct}></AddQuoteProduct>
    </>
  );
};

export default QuoteProductContainer;
