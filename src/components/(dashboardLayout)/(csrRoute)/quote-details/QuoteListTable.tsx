"use client";
import { Table, TableProps } from "antd";
import Link from "next/link";
import { IoEyeOutline } from "react-icons/io5";

type TDataType = {
  key: number;
  product: string;
  customerName: string;
  date: string;
  amount: string;
  status: string;
};
const data: TDataType[] = [
  {
    key: 1,
    product: "Hoodie",
    customerName: "Farvez Sir",
    date: "11 oct 24, 11.10PM",
    amount: "$152",
    status: "Pending",
  },
  {
    key: 2,
    product: "Hoodie",
    customerName: "Farvez Sir",
    date: "11 oct 24, 11.10PM",
    amount: "$152",
    status: "Approved",
  },
  {
    key: 3,
    product: "Hoodie",
    customerName: "Farvez Sir",
    date: "11 oct 24, 11.10PM",
    amount: "$152",
    status: "Quote Sent",
  },
  {
    key: 4,
    product: "Hoodie",
    customerName: "Farvez Sir",
    date: "11 oct 24, 11.10PM",
    amount: "$152",
    status: "Pending",
  },
  {
    key: 5,
    product: "Hoodie",
    customerName: "Farvez Sir",
    date: "11 oct 24, 11.10PM",
    amount: "$152",
    status: "Quote Sent",
  },
  {
    key: 6,
    product: "Hoodie",
    customerName: "Farvez Sir",
    date: "11 oct 24, 11.10PM",
    amount: "$152",
    status: "Approved",
  },
  {
    key: 7,
    product: "Hoodie",
    customerName: "Farvez Sir",
    date: "11 oct 24, 11.10PM",
    amount: "$152",
    status: "Pending",
  },
  {
    key: 8,
    product: "Hoodie",
    customerName: "Farvez Sir",
    date: "11 oct 24, 11.10PM",
    amount: "$152",
    status: "Quote Sent",
  },
  {
    key: 9,
    product: "Hoodie",
    customerName: "Farvez Sir",
    date: "11 oct 24, 11.10PM",
    amount: "$152",
    status: "Pending",
  },
  {
    key: 10,
    product: "Hoodie",
    customerName: "Farvez Sir",
    date: "11 oct 24, 11.10PM",
    amount: "$152",
    status: "Approved",
  },
  {
    key: 11,
    product: "Hoodie",
    customerName: "Farvez Sir",
    date: "11 oct 24, 11.10PM",
    amount: "$152",
    status: "Quote Sent",
  },
  {
    key: 12,
    product: "Hoodie",
    customerName: "Farvez Sir",
    date: "11 oct 24, 11.10PM",
    amount: "$152",
    status: "Approved",
  },
];

const columns: TableProps<TDataType>["columns"] = [
  {
    title: "Order ID",
    dataIndex: "key",
    render: (value) => `#${value}`,
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Customer Name",
    dataIndex: "customerName",
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
    title: "Status",
    dataIndex: "status",

    render: (value) => {
      if (value === "Pending") {
        return <p className="text-[#F16365]">{value}</p>;
      }
      if (value === "Quote Sent") {
        return <p>{value}</p>;
      }
      if (value === "Approved") {
        return <p className="text-[#00B047]">{value}</p>;
      }
    },
    filters: [
      {
        text: "Pending",
        value: "Pending",
      },
      {
        text: "Quote Sent",
        value: "Quote Sent",
      },
      {
        text: "Approved",
        value: "Approved",
      },
    ],
    onFilter: (value, record) => record.status.indexOf(value as string) === 0,
  },
  {
    title: "Action",
    dataIndex: "action",
    render: () => (
      <div className="ml-4">
        <Link href={"/quote-details/1"}>
        <IoEyeOutline className="cursor-pointer" size={20} />
        </Link>
      </div>
    ),
  },
];

const QuoteListTable = () => {
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
      ></Table>
    </div>
  );
};

export default QuoteListTable;