"use client";

import { useState } from "react";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import { useDeleteCategoryMutation, useGetCategoriesQuery } from "@/redux/api/categoryApi";
import {
  useDeleteQuoteCategoryMutation,
  useGetQuoteCategoriesQuery,
} from "@/redux/api/quoteCategoryApi";
import { TCategory } from "@/types/categoryTypes";
import { TResponse } from "@/types/global";
import { Button, message, Popconfirm, PopconfirmProps, Spin } from "antd";
import UpdateCategoryModal from "./UpdateCategoryModal";

// CategoriesPage Component
export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<{
    isQuoteCategory: boolean;
    category: TCategory | null;
  } | null>({ isQuoteCategory: false, category: null });

  // Fetch product categories using Redux hook
  const { data: productCategoriesData, isLoading: productCategoriesLoading } =
    useGetCategoriesQuery([]);
  const { data: quoteCategoryData, isLoading: quoteCategoryLoading } = useGetQuoteCategoriesQuery(
    [],
  );

  const productCategories = productCategoriesData as TResponse<TCategory[]>;
  const quoteCategories = quoteCategoryData as TResponse<TCategory[]>;

  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();
  const [deleteQuoteCategory, { isLoading: deleteQuoteCategoryLoading }] =
    useDeleteQuoteCategoryMutation();

  if (productCategoriesLoading || quoteCategoryLoading) {
    return <Spin size='large' />;
  }

  const handleDelete = (id: string, isQuoteCategory: boolean) => {
    if (isQuoteCategory) {
      deleteQuoteCategory({ categoryId: id });
    } else {
      deleteCategory({ categoryId: id });
    }
  };

  const confirm = (id: string, isQuoteCategory: boolean) => {
    console.log(id, isQuoteCategory);
    handleDelete(id, isQuoteCategory);
  };

  const CategoryGrid = ({
    categories,
    isQuoteCategory,
  }: {
    categories: TCategory[];
    isQuoteCategory: boolean;
  }) => (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6'>
      {categories.map((category) => (
        <div key={category._id} className='border rounded-lg shadow-md overflow-hidden'>
          <div className='relative w-full h-full max-h-48'>
            <Image
              src={category.image || "/placeholder.svg"}
              alt={category.name}
              width={200}
              height={200}
              className='w-auto h-[200px]'
            />
          </div>
          <div className='p-4'>
            <h3 className='text-lg font-semibold mb-2'>{category.name}</h3>
          </div>
          <div className='flex justify-between p-4 bg-gray-50 border-t'>
            <Button
              className='flex items-center !bg-transparent border-primaryBlack text-primaryBlack'
              onClick={() => setSelectedCategory({ isQuoteCategory, category })}
            >
              <Pencil className='w-4 h-4 mr-1' />
              Edit
            </Button>
            <Popconfirm
              title='Delete this category'
              description='Are you sure to delete this category?'
              onConfirm={() => confirm(category._id, isQuoteCategory)}
              okText='Yes'
              cancelText='No'
            >
              <Button
                loading={isLoading || deleteQuoteCategoryLoading}
                className='flex items-center bg-red-600 hover:text-white hover:bg-red-700'
                //onClick={() => handleDelete(category._id, isQuoteCategory)}
              >
                <Trash2 className='w-4 h-4 mr-1' />
                Delete
              </Button>
            </Popconfirm>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className='container mx-auto px-4 py-8'>
      <section className='mb-12'>
        <h2 className='text-2xl font-bold mb-6'>Product Categories</h2>
        <CategoryGrid categories={productCategories.data} isQuoteCategory={false} />
      </section>
      <section>
        <h2 className='text-2xl font-bold mb-6'>Quote Categories</h2>
        <CategoryGrid categories={quoteCategories.data} isQuoteCategory={true} />
      </section>
      <UpdateCategoryModal
        category={selectedCategory && selectedCategory?.category}
        setCategory={setSelectedCategory}
        isQuoteCategory={selectedCategory && selectedCategory.isQuoteCategory}
      />
    </div>
  );
}
