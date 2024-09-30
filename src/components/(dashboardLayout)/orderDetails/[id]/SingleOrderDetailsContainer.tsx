"use client";
import { Select } from "antd";
import { CiUser } from "react-icons/ci";
import { LuCalendarDays } from "react-icons/lu";
import masterCardlogo from "@/assets/image/mastercard.png";
import Image from "next/image";
import OrderProductTable from "./OrderProductTable";

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const SingleOrderDetailsContainer = ({}) => {
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <div className="flex items-center gap-3">
            <p className="text-xl font-bold ">Orders ID: #6743</p>

            <Select
              defaultValue="pending"
              style={{ width: 120, border: "none" }}
              className=""
              onChange={handleChange}
              options={[
                { value: "pending", label: "Pending" },
                { value: "processing", label: "Processing" },
                { value: "delivered", label: "Delivered" },
              
              ]}
            />
          </div>
          <div className=" flex items-center gap-3 mt-3">
            <LuCalendarDays className=" w-6 h-6" />
            <p className=" text-lg font-medium">Feb 16,2022 - Feb 20,2022</p>
          </div>
        </div>
        <div className="flex gap-3">
          <CiUser className="w-12 h-12 rounded-md bg-primaryBlack text-parimaryWhite py-2 px-2" />

          <div>
            <h2 className="text-xl font-bold mb-3">Customer</h2>
            <p className=" mb-2">Full Name: Emon</p>
            <p className=" mb-2">Email: emon@gmail.com</p>
            <p className=" mb-2">PHone: +545412110</p>
            <p className=" mb-2">Address: Keraniganj, Dhaka</p>
          </div>
        </div>
      </div>
      {/* payment datails */}
      <div className=" mt-5">
        <div className="bg-[#EBEDEE] p-4 rounded">
          <h1 className="text-xl font-bold text-[#232321] mb-4">
            Payment Info
          </h1>
          <div className="flex justify-between items-center">
            <div className="flex gap-x-3 items-center ">
              <Image src={masterCardlogo} alt="masterCardImg"></Image>
              <p>Master Card **** **** 6557</p>
            </div>
            <div className="flex gap-x-2 items-center">
              <p>Business name: Shristi Singh</p>
              <p>Phone: +91 904 231 1212</p>
            </div>
          </div>
        </div>
      </div>
      {/* order Products Table */}
      <div className="mt-6">
      <OrderProductTable></OrderProductTable>
      </div>
    </div>
  );
};

export default SingleOrderDetailsContainer;
