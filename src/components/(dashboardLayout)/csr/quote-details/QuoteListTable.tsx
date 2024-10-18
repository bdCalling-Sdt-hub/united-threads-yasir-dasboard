"use client";
import { useGetQuotesQuery } from "@/redux/api/quoteApi";
import { TResponse } from "@/types/global";
import { TQuote } from "@/types/quoteTypes";
import { Table, TableProps } from "antd";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";

const QuoteListTable = ({ date }: { date?: string | null }) => {
  const [limit, setLimit] = useState(10000000000);

  const query = [
    { label: "sort", value: "-createdAt" },
    { label: "limit", value: limit.toString() },
    { label: "quoteStatus", value: "pending" },
  ];

  if (date && typeof date === "string") {
    query.push({ label: "createdAt", value: date });
  }

  const { data, isLoading } = useGetQuotesQuery(query, {});

  console.log(data, "dataIndex");

  const result = data as TResponse<TQuote[]>;

  const columns: TableProps<TQuote>["columns"] = [
    {
      title: "Quote ID",
      dataIndex: "_id",
      render: (value) => `#${value}`,
    },
    {
      title: "Quote Name",
      dataIndex: "name", // Updated to reflect the TQuote field 'name'
      render: (value) => value || "N/A",
    },
    {
      title: "Pantone Code",
      dataIndex: "hexColor", // Added pantone color field from TQuote
      render: (value, record) => {
        return (
          <div className='flex items-center gap-x-2'>
            <span
              className='size-4 inline-block rounded-full'
              style={{ backgroundColor: value }}
            ></span>
            <span style={{ color: value }}>{record.pantoneColor}</span>
          </div>
        );
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    //{
    //  title: "Total",
    //  dataIndex: "price",
    //  render: (value) => `$${value}`,
    //},
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (value) => moment(value).format("lll"),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (value, record) => (
        <div className='ml-4'>
          <Link href={`/csr/quote-details/${record._id}`}>
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

export default QuoteListTable;
