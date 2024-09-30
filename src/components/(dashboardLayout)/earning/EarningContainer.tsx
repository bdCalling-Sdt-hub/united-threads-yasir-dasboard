"use client";
import { Table, TableProps } from "antd";
import { useState } from "react";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import EaringDetaisModal from "./EarningDetailsModal";

const EarningContainer = () => {
    const [open, setOpen] = useState(false);
  type TDataType = {
    key: number;
    product: string;
    buyerEmail: string;
    date: string;
    amount: string;
  };
  const data: TDataType[] = Array.from({ length: 12 }).map((_, inx) => ({
    key: inx + 1,
    product: "Hoodie",
    buyerEmail: "info@gmail.com",
    date: "11 oct 24, 11.10PM",
    amount: "$152",
  }));

  const columns: TableProps<TDataType>["columns"] = [
    {
      title: "Serial",
      dataIndex: "key",
      render: (value) => `#${value}`,
    },
    {
      title: "Product",
      dataIndex: "product",
    },
    {
      title: " Buyer Email",
      dataIndex: "buyerEmail",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: () => (
        <div className="ml-4">
          <IoEyeOutline className="cursor-pointer" size={20} onClick={()=>setOpen(!open)} />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center py-4 gap-10">
        <h1 className="text-2xl font-bold">Earnings</h1>
        <>
          <div className="flex items-center gap-x-6 p-3 bg-black rounded-lg text-white">
            <div className="flex items-center gap-x-3">
              <FaArrowRightArrowLeft size={20} color="white" />
              <p className="text-white">Today’s Earning</p>
            </div>
            <p className="font-semibold text-base"> $1520 </p>
          </div>
        </>
        <>
          <div className="flex items-center gap-x-3 p-3 bg-black rounded-lg text-white">
            <FaArrowRightArrowLeft size={20} color="white" />
            <p className="text-white">Total Earning</p>
            <p className="font-semibold text-base"> $5520 </p>
          </div>
        </>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10, responsive: true }}
      ></Table>
      <EaringDetaisModal open={open} setOpen={setOpen}></EaringDetaisModal>
    </div>
  );
};

export default EarningContainer;
