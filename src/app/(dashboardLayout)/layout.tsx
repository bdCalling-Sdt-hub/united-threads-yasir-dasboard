"use client";
import userImag from "@/assets/image/userImage.png";
import Sidebar from "@/components/shared/Sidebar";
import { Button, Layout } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import { GoBell } from "react-icons/go";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
const { Content } = Layout;

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
 

  const navbarTitle = pathname.split("/")[1];
  console.log(navbarTitle);
  return (
    <Layout style={{ minHeight: "100dvh" }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <nav className="flex items-center justify-between py-4 pr-[68px]">
          <div className="flex items-center gap-x-2">
            <Button
              type="text"
              icon={
                collapsed ? (
                  <RxCross2 size={32} className="text-info" />
                ) : (
                  <IoMenu size={32} className="text-info" />
                )
              }
              onClick={() => setCollapsed(!collapsed)}
            />
            <h1 className="capitalize text-2xl font-bold text-info font-roboto">
              {navbarTitle.length > 1
                ? navbarTitle.replaceAll("/", " ").replaceAll("-", " ")
                : "dashboard"}
            </h1>
          </div>
          <div className="flex items-center gap-x-6">
            <Link href={"/notifications"}>
              <div
                role="button"
                className="relative aspect-square size-12 rounded-full bg-info flex-item-center"
              >
                <GoBell size={20} />
                <span className="absolute top-1.5 right-1.5 size-[18px] bg-warning text-parimaryWhite rounded-full text-sm flex-item-center">
                  3
                </span>
              </div>
            </Link>
            <Link href={"/profile"}>
              <div className="flex items-center gap-x-3">
                <Image
                  src={userImag}
                  alt="admin profile"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <h4 className="text-base font-medium text-info ">Akash</h4>
              </div>
            </Link>
          </div>
        </nav>
        <Content className="bg-info rounded-tl-lg p-6 h-[90vh] overflow-auto">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
