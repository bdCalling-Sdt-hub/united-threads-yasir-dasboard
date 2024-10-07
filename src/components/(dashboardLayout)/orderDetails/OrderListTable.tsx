"use client";
import { ORDER_STATUS } from "@/constant";
import { useGetOrdersQuery } from "@/redux/api/orderApi";
import { TOrder } from "@/redux/api/orderType";
import { TResponse } from "@/types/global";
import { Table, TableProps } from "antd";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";

//type TDataType = {
//  key: number;
//  product: string;
//  customerName: string;
//  date: string;
//  amount: string;
//  status: string;
//};
//const data: TDataType[] = [
//  {
//    key: 1,
//    product: "Hoodie",
//    customerName: "Farvez Sir",
//    date: "11 oct 24, 11.10PM",
//    amount: "$152",
//    status: "Pending",
//  },
//  {
//    key: 2,
//    product: "Hoodie",
//    customerName: "Farvez Sir",
//    date: "11 oct 24, 11.10PM",
//    amount: "$152",
//    status: "Delivered",
//  },
//  {
//    key: 3,
//    product: "Hoodie",
//    customerName: "Farvez Sir",
//    date: "11 oct 24, 11.10PM",
//    amount: "$152",
//    status: "Processing",
//  },
//  {
//    key: 4,
//    product: "Hoodie",
//    customerName: "Farvez Sir",
//    date: "11 oct 24, 11.10PM",
//    amount: "$152",
//    status: "Pending",
//  },
//  {
//    key: 5,
//    product: "Hoodie",
//    customerName: "Farvez Sir",
//    date: "11 oct 24, 11.10PM",
//    amount: "$152",
//    status: "Processing",
//  },
//  {
//    key: 6,
//    product: "Hoodie",
//    customerName: "Farvez Sir",
//    date: "11 oct 24, 11.10PM",
//    amount: "$152",
//    status: "Delivered",
//  },
//  {
//    key: 7,
//    product: "Hoodie",
//    customerName: "Farvez Sir",
//    date: "11 oct 24, 11.10PM",
//    amount: "$152",
//    status: "Pending",
//  },
//  {
//    key: 8,
//    product: "Hoodie",
//    customerName: "Farvez Sir",
//    date: "11 oct 24, 11.10PM",
//    amount: "$152",
//    status: "Processing",
//  },
//  {
//    key: 9,
//    product: "Hoodie",
//    customerName: "Farvez Sir",
//    date: "11 oct 24, 11.10PM",
//    amount: "$152",
//    status: "Pending",
//  },
//  {
//    key: 10,
//    product: "Hoodie",
//    customerName: "Farvez Sir",
//    date: "11 oct 24, 11.10PM",
//    amount: "$152",
//    status: "Delivered",
//  },
//  {
//    key: 11,
//    product: "Hoodie",
//    customerName: "Farvez Sir",
//    date: "11 oct 24, 11.10PM",
//    amount: "$152",
//    status: "Processing",
//  },
//  {
//    key: 12,
//    product: "Hoodie",
//    customerName: "Farvez Sir",
//    date: "11 oct 24, 11.10PM",
//    amount: "$152",
//    status: "Delivered",
//  },
//];

//const columns: TableProps<TDataType>["columns"] = [
//  {
//    title: "Order ID",
//    dataIndex: "key",
//    render: (value) => `#${value}`,
//  },
//  {
//    title: "Product",
//    dataIndex: "product",
//  },
//  {
//    title: "Customer Name",
//    dataIndex: "customerName",
//  },
//  {
//    title: "Date",
//    dataIndex: "date",
//  },
//  {
//    title: "Amount",
//    dataIndex: "amount",
//  },
//  {
//    title: "Status",
//    dataIndex: "status",

//    render: (value) => {
//      if (value === "Pending") {
//        return <p className='text-[#F16365]'>{value}</p>;
//      }
//      if (value === "Processing") {
//        return <p>{value}</p>;
//      }
//      if (value === "Delivered") {
//        return <p className='text-[#00B047]'>{value}</p>;
//      }
//    },
//    filters: [
//      {
//        text: "Pending",
//        value: "Pending",
//      },
//      {
//        text: "Processing",
//        value: "Processing",
//      },
//      {
//        text: "Delivered",
//        value: "Delivered",
//      },
//    ],
//    onFilter: (value, record) => record.status.indexOf(value as string) === 0,
//  },
//  {
//    title: "Action",
//    dataIndex: "action",
//    render: () => (
//      <div className='ml-4'>
//        <Link href={"/order-details/1"}>
//          <IoEyeOutline size={20} />
//        </Link>
//      </div>
//    ),
//  },
//];

const OrderListTable = () => {
  const [limit, setLimit] = useState(10000000000);
  //const [orderId, setOrderId] = useState("");
  const { data, isLoading } = useGetOrdersQuery(
    [
      { label: "sort", value: "-createdAt" },
      { label: "limit", value: limit.toString() },
      { label: "orderType", value: "SHOP" },
    ],
    {},
  );

  const result = data as TResponse<TOrder[]>;

  console.log(result?.data, "data");

  const columns: TableProps<TOrder>["columns"] = [
    {
      title: "Order ID",
      dataIndex: "_id",
      render: (value) => `#${value}`,
    },
    {
      title: "Product",
      dataIndex: "product",
      render: (value) => value?.name,
    },
    {
      title: "Customer Name",
      dataIndex: "user",
      render: (value) => `${value?.firstName} ${value?.lastName}`,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (value) => moment(value).format("lll"),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (value) => `$${value}`,
    },
    {
      title: "Status",
      dataIndex: "status",

      render: (value) => {
        if (value === ORDER_STATUS.PENDING) {
          return <p className='font-medium text-[#F16365]'>{value}</p>;
        }
        if (value === ORDER_STATUS.SHIPPED) {
          return <p className='font-medium'>{value}</p>;
        }
        if (value === ORDER_STATUS.DELIVERED) {
          return <p className='font-medium text-[#00B047]'>{value}</p>;
        }
      },
      filters: Object.keys(ORDER_STATUS).map((key) => ({
        text: key,
        value: key,
      })),
      onFilter: (value, record) => record.status.indexOf(value as string) === 0,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (value, record) => (
        <div className='ml-4'>
          <Link href={`/admin/order-details/${record._id}`}>
            <IoEyeOutline size={20} />
          </Link>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (!isLoading && result?.meta?.total) {
      setLimit(result?.meta?.total);
    }
  }, [isLoading, result?.meta?.total]);

  return (
    <div>
      <Table
        columns={columns}
        loading={isLoading}
        dataSource={result?.data}
        pagination={{ pageSize: 20 }}
      ></Table>
    </div>
  );
};

export default OrderListTable;
