"use client";
import logoImage from "@/assets//image/logo.png";
import { useAppSelector } from "@/redux/hooks";
import { logoutUser } from "@/services/logout";
import { Button, Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import MenuItem from "antd/es/menu/MenuItem";
import { Images } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineBarChart } from "react-icons/ai";
import { CiBadgeDollar, CiLogout } from "react-icons/ci";
import { GoChecklist } from "react-icons/go";
import { HiOutlineCircleStack } from "react-icons/hi2";
import { LuClipboardList } from "react-icons/lu";
import { MdManageHistory } from "react-icons/md";
import { PiUsersThreeThin } from "react-icons/pi";
import { RiContactsBookUploadLine } from "react-icons/ri";
import { SlBookOpen } from "react-icons/sl";
import { TbChecklist, TbListDetails, TbSettingsCheck } from "react-icons/tb";
type MenuItem = Required<MenuProps>["items"][number];

type TSidebarType = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

const adminNavLink: MenuItem[] = [
  {
    key: "dashboard",
    label: <Link href='/admin'>Dashboard</Link>,
    icon: <AiOutlineBarChart size={24} />,
  },
  {
    key: "user-management",
    icon: <PiUsersThreeThin strokeWidth={1} size={24} />,
    label: <Link href='/admin/user-management'>Customer Management</Link>,
  },
  {
    key: "earnings",
    icon: <CiBadgeDollar strokeWidth={1} size={24} />,
    label: <Link href='/admin/earnings'>Earnings</Link>,
  },
  {
    key: "products",
    icon: <LuClipboardList size={24} />,
    label: <Link href='/admin/products'>Shop Produts</Link>,
  },
  {
    key: "orders",
    icon: <GoChecklist size={24} />,
    label: <Link href='/admin/order-details'>Order Details</Link>,
  },
  {
    key: "quotes",
    icon: <TbListDetails size={24} />,
    label: "Quote Details",
    children: [
      {
        key: "quoteCategory",
        icon: <RiContactsBookUploadLine size={24} />,
        label: <Link href='/admin/quote-product'>Quote Product</Link>,
      },
      {
        key: "quoteManagement",
        icon: <MdManageHistory size={24} />,
        label: <Link href='/admin/quote-management'>Quote Management</Link>,
      },
    ],
  },
  {
    key: "gallery",
    icon: <Images size={24} />,
    label: <Link href='/admin/gallery'>Gallery</Link>,
  },
  {
    key: "settings",
    icon: <TbSettingsCheck size={24} />,
    label: "Settings",
    children: [
      {
        key: "aboutUs",
        icon: <HiOutlineCircleStack size={24} />,
        label: <Link href='/admin/aboutUs'>About Us</Link>,
      },
      {
        key: "privacyPolicy",
        icon: <HiOutlineCircleStack size={24} />,
        label: <Link href='/admin/privacy-policy'>Privacy Policy</Link>,
      },
      {
        key: "terms",
        icon: <SlBookOpen size={24} />,
        label: <Link href='/admin/terms'>Terms of use</Link>,
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
    label: <Link href='/csr/quote-details'>Quote Details</Link>,
    icon: <TbChecklist size={24} />,
  },
  {
    key: "messages",
    label: <Link href='/csr/messages'>Messages</Link>,
    icon: <TbListDetails size={24} />,
  },

  {
    key: "logout",
    icon: <CiLogout strokeWidth={0.8} size={24} />,
    label: <Link href={"/login"}>Logout</Link>,
  },
];

const Sidebar = ({ collapsed, setCollapsed }: TSidebarType) => {
  const [current, setCurrent] = useState("dashboard");
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
    if (e.key === "logout") {
      //localStorage.removeItem("user");
      logoutUser(router);
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
        <div className='demo-logo-vertical pb-4 pt-20'>
          <Image src={logoImage} alt='logoImage'></Image>
        </div>
        <Menu
          onClick={onClick}
          defaultOpenKeys={["dashboard"]}
          selectedKeys={[current]}
          mode='inline'
          items={user?.role === "ADMIN" ? adminNavLink : user?.role === "CSR" ? nvaLinkCSR : []}
        />
      </div>
    </Sider>
  );
};

export default Sidebar;
