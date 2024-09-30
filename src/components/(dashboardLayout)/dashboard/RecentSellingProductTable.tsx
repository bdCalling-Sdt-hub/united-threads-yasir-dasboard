"use client";
import { ConfigProvider, Table, TableProps } from "antd";
import { IoEyeOutline } from "react-icons/io5";
import SellProductDetailsModal from "./SellProductDetailsModal";
import { useState } from "react";

type TDataType = {
  key: number;
  product: string;
  buyerEmail: string;
  date: string;
  amount: string;
};
const data: TDataType[] = Array.from({length: 12}).map((_,inx)=>(
    {
        key: inx + 1,
        product: "Hoodie",
        buyerEmail: "info@gmail.com",
        date: "11 oct 24, 11.10PM",
        amount: "$152",
      }
))




const RecentSellingProductTable = () => {
  const [open, setOpen] = useState(false);

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
        <div className="ml-4 cursor-pointer">
          <IoEyeOutline size={20} onClick={()=> setOpen(true)} />
        </div>
      ),
    },
  ];

  return (
    <>
    <ConfigProvider
      theme={{
        components: {
          Table: {
            colorBgContainer: "rgb(35,35,35)",
            colorText: "rgb(248,250,252)",
            colorTextHeading: "rgb(248,250,252)",
            headerBg: "rgb(87,88,88)",
            borderColor: "rgb(0,0,0)",
            headerSplitColor: "rgb(87,88,88)",
          },
        },
      }}
    >
      <div>
        <h1 className="text-2xl font-bold pb-2">Recent Selling Products</h1>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 7 }}
        ></Table>
      </div>
    </ConfigProvider>
    <SellProductDetailsModal open={open} setOpen={setOpen}></SellProductDetailsModal>
    </>
  );
};

export default RecentSellingProductTable;
