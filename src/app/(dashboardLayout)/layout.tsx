"use client";
import userImag from "@/assets/image/user.png";
import NotificationCount from "@/components/shared/NotificationCount";
import Sidebar from "@/components/shared/Sidebar";
import { useGetProfileQuery } from "@/redux/api/userApi";
import { TResponse } from "@/types/global";
import { TUser } from "@/types/userType";
import { Button, Layout, Skeleton } from "antd";
import SkeletonAvatar from "antd/es/skeleton/Avatar";
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
  const { data, isLoading } = useGetProfileQuery([]);
  const result = (data as TResponse<TUser>)?.data;
  const navbarTitle = pathname.split("/")[1];
  return (
    <Layout style={{ minHeight: "100dvh" }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <nav className='flex items-center justify-between py-4 pr-[68px]'>
          <div className='flex items-center gap-x-2'>
            <Button
              type='text'
              icon={
                collapsed ? (
                  <RxCross2 size={32} className='text-info' />
                ) : (
                  <IoMenu size={32} className='text-info' />
                )
              }
              onClick={() => setCollapsed(!collapsed)}
            />
            <h1 className='capitalize text-2xl font-bold text-info font-roboto'>
              {navbarTitle.length > 1
                ? navbarTitle.replaceAll("/", " ").replaceAll("-", " ")
                : "dashboard"}
            </h1>
          </div>
          <div className='flex items-center gap-x-6'>
            <>
             <NotificationCount />
            </>
            <Link href={"/profile"}>
              <div className='flex items-center gap-x-3'>
                {isLoading ? (
                  <>
                    <SkeletonAvatar active={true} size={40} />
                    <Skeleton />
                  </>
                ) : (
                  <>
                    <Image
                      src={result?.profilePicture || userImag}
                      alt='admin profile'
                      width={48}
                      height={48}
                      className='rounded-full'
                    />
                    <h4 className='text-base font-medium text-info '>{result?.firstName}</h4>
                  </>
                )}
              </div>
            </Link>
          </div>
        </nav>
        <Content className='bg-info rounded-tl-lg p-6 h-[90vh] overflow-auto'>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
