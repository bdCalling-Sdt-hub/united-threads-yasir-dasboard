"use client";
import ProductCard from "@/components/(dashboardLayout)/products/ProductCard";
import { TProduct } from "@/types/type";
import { Button, Segmented } from "antd";
import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FaChevronLeft } from "react-icons/fa6";
import AddCetagoryModal from "./AddCetagoryModal";
import Link from "next/link";



const ProductsContainer = () => {
  const [open, setOpen ] = useState(false);
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


  const products: TProduct[] = [
  {
    _id: "1",
    name: "Wireless Bluetooth Headphones",
    category: "Electronics",
    price: 59.99,
    shortDescription: "High-quality wireless headphones with noise cancellation.",
    description: "These wireless Bluetooth headphones feature advanced noise-canceling technology and up to 30 hours of battery life. Ideal for long trips and home office use.",
    image: "https://example.com/images/headphones.jpg",
    salesCount: 120,
    quantity: 50,
    createdAt: "2024-09-10T12:34:56.000Z",
    updatedAt: "2024-09-10T12:34:56.000Z"
  },
  {
    _id: "2",
    name: "Smart LED TV 55-inch",
    category: "Electronics",
    price: 699.99,
    shortDescription: "Ultra HD 4K Smart LED TV with built-in apps.",
    description: "This 55-inch Ultra HD 4K Smart LED TV offers crystal-clear picture quality, built-in streaming apps, and voice control features. A great addition to any living room.",
    image: "https://example.com/images/tv.jpg",
    salesCount: 80,
    quantity: 30,
    createdAt: "2024-08-15T10:22:11.000Z",
    updatedAt: "2024-09-05T15:21:45.000Z"
  },
  {
    _id: "3",
    name: "Gaming Laptop Pro",
    category: "Computers",
    price: 1299.99,
    shortDescription: "Powerful gaming laptop with 16GB RAM and RTX 3070.",
    description: "The Gaming Laptop Pro features a high-performance Intel i7 processor, 16GB RAM, and an NVIDIA RTX 3070 GPU. Perfect for gaming and heavy computing tasks.",
    image: "https://example.com/images/laptop.jpg",
    salesCount: 45,
    quantity: 20,
    createdAt: "2024-07-20T09:11:22.000Z",
    updatedAt: "2024-08-30T14:12:33.000Z"
  },
  {
    _id: "4",
    name: "Smartphone X Ultra",
    category: "Mobile Phones",
    price: 999.99,
    shortDescription: "Latest model smartphone with 128GB storage and 5G connectivity.",
    description: "The Smartphone X Ultra offers a stunning edge-to-edge display, 128GB storage, and 5G support. Capture amazing photos with the triple-camera system.",
    image: "https://example.com/images/smartphone.jpg",
    salesCount: 200,
    quantity: 100,
    createdAt: "2024-08-01T12:45:34.000Z",
    updatedAt: "2024-09-01T10:15:56.000Z"
  },
  {
    _id: "5",
    name: "Electric Scooter",
    category: "Transportation",
    price: 499.99,
    shortDescription: "Electric scooter with a 25-mile range and foldable design.",
    description: "This electric scooter features a powerful motor, 25-mile range, and a foldable design for easy storage. Perfect for city commutes and recreational rides.",
    image: "https://example.com/images/scooter.jpg",
    salesCount: 70,
    quantity: 15,
    createdAt: "2024-06-05T08:30:45.000Z",
    updatedAt: "2024-09-09T13:20:30.000Z"
  }
];


  return (
    <>
    <div className="space-y-6">
      <div>
        <Button
          className="w-full bg-[#232323] text-[#fff] font-semibold !py-6 uppercase"
          icon={<CiCirclePlus size={20} color="#fff" />}
          onClick={()=> setOpen(true)}
        >
          Add New Category
        </Button>
        <div className="flex items-center justify-between py-4">
          <h1 className="text-2xl font-bold w-full">All Products</h1>
          <Link href={"/products/addProduct"}>
          <Button
            className="bg-[#232323] text-[#fff] min-w-48 !py-5"
            icon={<CiCirclePlus size={20} color="#fff" />}
            >
            Add Product
          </Button>
            </Link>
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
            {
                products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))
            }
        </div>
    </div>
    <AddCetagoryModal open={open} setOpen={setOpen}></AddCetagoryModal>
    </>
  );
};



export default ProductsContainer;
