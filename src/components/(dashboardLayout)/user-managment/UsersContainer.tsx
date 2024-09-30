"use client";
import {
  Input,
  message,
  Popconfirm,
  PopconfirmProps,
  Table,
  TableProps,
} from "antd";
import { IoIosSearch } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { LiaUserTimesSolid } from "react-icons/lia";
import UserModal from "./UserModal";
import { useState } from "react";

const confirm: PopconfirmProps["onConfirm"] = (e) => {
  console.log(e);
  message.success("Successfully blocked this user");
};

const UserMangementContainer = () => {
const [open, setOpen] = useState(false)


  type TDataType = {
    key: number;
    name: string;
    email: string;
    date: string;
  };
  const data: TDataType[] = Array.from({ length: 50 }).map((_, inx) => ({
    key: inx + 1,
    name: "Opu",
    email: "info@gmail.com",
    date: "11 oct 24, 11.10PM",
  }));

  const columns: TableProps<TDataType>["columns"] = [
    {
      title: "Serial",
      dataIndex: "key",
      render: (value) => `#${value}`,
    },
    {
      title: "Customer Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: () => (
        <div className="ml-4 flex gap-x-3">
          <IoEyeOutline className="cursor-pointer" size={20} onClick={()=> setOpen(true)} />
          <Popconfirm
            title="Block the User"
            description="Are you sure to block this user?"
            onConfirm={confirm}
            okText="Yes"
            cancelText="No"
          >
            <LiaUserTimesSolid className="cursor-pointer" size={20} color="red" />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <h1 className="text-2xl font-bold w-full">User Management</h1>
        <Input
          type="search"
          placeholder="Search..."
          prefix={<IoIosSearch size={20} />}
          className="max-w-md bg-black text-[#F8FAFC] placeholder:!text-white py-2"
          defaultValue={"Search..."}
        />
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10, responsive: true }}
      ></Table>
      <UserModal open={open} setOpen={setOpen}></UserModal>
    </div>
  );
};

export default UserMangementContainer;
