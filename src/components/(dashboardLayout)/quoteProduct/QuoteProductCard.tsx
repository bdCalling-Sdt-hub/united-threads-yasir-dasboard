/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import productImg from "@/assets/product.jpg";
import { useDeleteProductMutation } from "@/redux/api/productApi";
import { useDeleteQuoteProductMutation } from "@/redux/api/quoteProductApi";
import { TQuoteProduct } from "@/types/quoteProductTypes";
import { Popconfirm, PopconfirmProps, Tag } from "antd";
import Image from "next/image";
import Link from "next/link";
import { FaArrowUp } from "react-icons/fa6";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";
import UpdateQuoteProductModal from "./UpdateQuoteProductModal";
import { useState } from "react";

const QuoteProductCard = ({ product }: { product: TQuoteProduct }) => {
  const [deleteProduct] = useDeleteQuoteProductMutation();
  const [open, setOpen] = useState(false);
  const confirm: PopconfirmProps["onConfirm"] = async () => {
    try {
      const res = await deleteProduct({ productId: product._id });
      if (res?.data?.success) {
        //setOpen(false);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div
      className={`p-4 border border-primaryBlack rounded-xl font-roboto space-y-4 relative w-full`}
    >
      <div className='flex items-center gap-4 mt-5'>
        <Image src={productImg} alt={product.name} width={84} height={84} />
        <div>
          <div className=' flex flex-col gap-3'>
            <h1 className='text-xl font-bold'>{product.name}</h1>
            {/*<p className='text-base'> ${product}</p>*/}
          </div>
        </div>
      </div>

      {/* delete and esit btn */}
      <div className='mt-2 flex gap-1 absolute top-0 right-1'>
        <Popconfirm
          title='Delete the task'
          description='Are you sure to delete this task?'
          onConfirm={confirm}
          okText='Yes'
          cancelText='No'
        >
          <div className='p-3 bg-red-500 rounded-full cursor-pointer'>
            <FiTrash2 color='#fff' size={16} />
          </div>
        </Popconfirm>

        <button onClick={() => setOpen((pre) => !pre)} className='p-3  bg-green-500 rounded-full'>
          <FiEdit color='#fff' size={16} />
        </button>
      </div>

      <div className='space-y-2'>
        <h3 className='text-lg font-semibold'>Product Size</h3>
        <div className='flex items-center gap-x-3'>
          {product?.size?.map((s) => (
            <Tag key={s} color='' className='min-w-12 text-center'>
              {s}
            </Tag>
          ))}
        </div>
      </div>
      <div className='border border-[#334A55]/30 p-3 rounded-md space-y-3'>
        <div className='flex justify-between items-center font-semibold'>
          <p>Sales Count</p>
          <p className='flex items-center gap-2'>
            <FaArrowUp size={16} /> {product.orderCount}
          </p>
        </div>
        <div className='border-t'></div>
        <div className='flex justify-between items-center font-semibold'>
          <p>Remaining Products</p>
          <div className='flex items-center gap-2'>
            <p>{product.stock}</p>
          </div>
        </div>
      </div>
      <UpdateQuoteProductModal open={open} setOpen={setOpen} quoteProduct={product} />
    </div>
  );
};

export default QuoteProductCard;
