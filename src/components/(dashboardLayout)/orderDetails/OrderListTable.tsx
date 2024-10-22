"use client";
import OrderDetailsModal from "@/components/shared/OrderDetailsModal";
import { ORDER_STATUS } from "@/constant";
import { useGetOrdersQuery } from "@/redux/api/orderApi";
import { TOrder } from "@/redux/api/orderType";
import { TResponse } from "@/types/global";
import { Table, TableProps } from "antd";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import Tag from "../../shared/Tag";

const OrderListTable = () => {
  const [limit, setLimit] = useState(10000000000);
  //const [orderId, setOrderId] = useState("");
  const { data, isLoading } = useGetOrdersQuery(
    [
      { label: "sort", value: "-createdAt" },
      { label: "limit", value: limit.toString() },
    ],
    {},
  );

  const result = data as TResponse<TOrder[]>;

  const columns: TableProps<TOrder>["columns"] = [
    {
      title: "Order ID",
      dataIndex: "_id",
      render: (value) => `#${value}`,
    },
    {
      title: "Product Type",
      dataIndex: "orderType",
      filters: [
        {
          text: "SHOP",
          value: "SHOP",
        },
        {
          text: "QUOTE",
          value: "QUOTE",
        },
      ],
      onFilter: (value, record) => record.orderType.indexOf(value as string) === 0,
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
        return <Tag status={value} />;
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
          {/*<Link href={`/admin/order-details/${record._id}`}>
            <IoEyeOutline size={20} />
          </Link>*/}
          <>
            <IoEyeOutline
              className='cursor-pointer'
              onClick={() => setOpen(record._id)}
              size={20}
            />
          </>
        </div>
      ),
    },
  ];

  const [open, setOpen] = useState<null | string>(null);

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
      <OrderDetailsModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default OrderListTable;
