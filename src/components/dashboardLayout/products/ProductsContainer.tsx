"use client";
import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
import { useGetProductsQuery } from "@/redux/api/productApi";
import { TCategory } from "@/types/categoryTypes";
import { TResponse } from "@/types/global";
import { TProduct } from "@/types/productType";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Empty, Pagination, Segmented, Spin } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import AddCetagoryModal from "./AddCetagoryModal";
import ProductCard from "./ProductCard";

const ProductsContainer = () => {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const { data: categoryData, isLoading: categoriesLoading } = useGetCategoriesQuery({});
  const result = categoryData as TResponse<TCategory[]>;

  // State for categories and visible categories
  const [allCategories, setAllCategories] = useState<{ label: string; value: string }[]>([
    { label: "ALL", value: "ALL" },
  ]);
  const [visibleCategories, setVisibleCategories] = useState(allCategories.slice(0, 6));

  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8); // Default limit

  useEffect(() => {
    if (!categoriesLoading && result?.data?.length) {
      const categoryOptions = result.data.map((category) => ({
        label: category.name,
        value: category._id,
      }));

      setAllCategories([{ label: "ALL", value: "ALL" }, ...categoryOptions]);
      setVisibleCategories([{ label: "ALL", value: "ALL" }, ...categoryOptions].slice(0, 6));
    }
  }, [categoryData]);

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

  //{
  //  category: selectedCategory === "ALL" ? null : selectedCategory,
  //  page,
  //  limit: pageSize,
  //}

  // Fetch products based on the selected category, page, and pageSize
  const { data: productData, isLoading: productIsLoading } = useGetProductsQuery([
    { label: "category", value: selectedCategory === "ALL" ? "" : selectedCategory },
    { label: "page", value: page.toString() },
    { label: "limit", value: pageSize.toString() },
  ]);

  const products: TProduct[] = productData?.data || [];
  const totalProducts = productData?.meta?.total || 0;

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
              onChange={(value) => {
                setSelectedCategory(value as string);
                setPage(1); // Reset to first page on category change
              }}
              block
              className='w-full'
            />
            <Button onClick={handleRightClick} className='bg-[#232323] text-[#fff] !py-5'>
              <FaChevronRight size={24} />
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
          <>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            <div className='w-full flex justify-center'>
              <Pagination
                current={page}
                pageSize={pageSize}
                total={totalProducts}
                onChange={(newPage, newPageSize) => {
                  setPage(newPage);
                  if (newPageSize !== pageSize) {
                    setPageSize(newPageSize || 8);
                  }
                }}
                showSizeChanger
                pageSizeOptions={["8", "16", "24", "32"]}
                className='mt-6 text-center'
              />
            </div>
          </>
        )}
      </div>
      <AddCetagoryModal open={open} setOpen={setOpen} />
    </>
  );
};

export default ProductsContainer;
