"use client";
import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineBarChart } from "react-icons/ai";
import { CiBadgeDollar, CiLogout } from "react-icons/ci";
import { GoChecklist } from "react-icons/go";
import { LuClipboardList } from "react-icons/lu";
import { PiUsersThreeThin } from "react-icons/pi";
import { TbListDetails, TbSettingsCheck } from "react-icons/tb";
import { HiOutlineCircleStack } from "react-icons/hi2";
import { SlBookOpen } from "react-icons/sl";
import { RiContactsBookUploadLine } from "react-icons/ri";
import { MdManageHistory } from "react-icons/md";
import { TbChecklist } from "react-icons/tb";
import logoImage from "@/assets//image/logo.png";
import { useEffect, useState } from "react";
import MenuItem from "antd/es/menu/MenuItem";
type MenuItem = Required<MenuProps>["items"][number];

type TSidebarType = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

const adminNavLink: MenuItem[] = [
  {
    key: "dashboard",
    label: <Link href="/dashboard">Dashboard</Link>,
    icon: <AiOutlineBarChart size={24} />,
  },
  {
    key: "user-management",
    icon: <PiUsersThreeThin strokeWidth={1} size={24} />,
    label: <Link href="/user-management">User Management</Link>,
  },
  {
    key: "earnings",
    icon: <CiBadgeDollar strokeWidth={1} size={24} />,
    label: <Link href="/earnings">Earnings</Link>,
  },
  {
    key: "products",
    icon: <LuClipboardList size={24} />,
    label: <Link href="/products">Shop Produts</Link>,
  },
  {
    key: "orders",
    icon: <GoChecklist size={24} />,
    label: <Link href="/order-details">Order Details</Link>,
  },
  {
    key: "quotes",
    icon: <TbListDetails size={24} />,
    label: "Quote Details",
    children: [
      {
        key: "productCategory",
        icon: <RiContactsBookUploadLine size={24} />,
        label: <Link href="/quote-product">Product Category</Link>,
      },
      {
        key: "quoteManagement",
        icon: <MdManageHistory size={24} />,
        label: <Link href="/quote-management">Quote Management</Link>,
      },
    ],
  },
  {
    key: "settings",
    icon: <TbSettingsCheck size={24} />,
    label: "Settings",
    children: [
      {
        key: "aboutUs",
        icon: <HiOutlineCircleStack size={24} />,
        label: <Link href="/aboutUs">About Us</Link>,
      },
      {
        key: "privacyPolicy",
        icon: <HiOutlineCircleStack size={24} />,
        label: <Link href="/privacy-policy">Privacy Policy</Link>,
      },
      {
        key: "terms",
        icon: <SlBookOpen size={24} />,
        label: <Link href="/terms">Terms of use</Link>,
      },
    ],
  },
  {
    key: "logout",
    icon: <CiLogout strokeWidth={0.8} size={24} />,
    label: <Link href={"/login"}>Logout</Link>,
  },
];

const nvaLinkCSR: MenuItem[] = [
  {
    key: "quoteDetails",
    label: <Link href="/quote-details">Quote Details</Link>,
    icon: <TbChecklist size={24} />,
  },
  {
    key: "logout",
    icon: <CiLogout strokeWidth={0.8} size={24} />,
    label: <Link href={"/login"}>Logout</Link>,
  },
];

const Sidebar = ({ collapsed, setCollapsed }: TSidebarType) => {
  const [current, setCurrent] = useState("dashboard");
  const [role, setRole] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    setUser(localStorage.getItem("user") as string);
    if ( user) {
      return setRole(user?.split("@")[0] as string);
    }
    console.log("user not found");
  }, [user, role]);


  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
    if (e.key === "logout") {
      localStorage.removeItem("user");
    }
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(!value)}
      className={`px-2 overflow-hidden ${!collapsed ? "min-w-[230px]" : ""}`}
    >
      <div>
        <div className="demo-logo-vertical pb-4 pt-20">
          <Image src={logoImage} alt="logoImage"></Image>
        </div>
        <Menu
          onClick={onClick}
          defaultOpenKeys={["dashboard"]}
          selectedKeys={[current]}
          mode="inline"
          items={
            role === ("admin" as string)
              ? adminNavLink
              : role === ("csr" as string)
              ? nvaLinkCSR
              : []
          }
        />
      </div>
    </Sider>
  );
};

export default Sidebar;
