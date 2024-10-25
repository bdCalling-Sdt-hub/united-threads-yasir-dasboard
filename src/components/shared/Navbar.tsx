"use client";
import userImag from "@/assets/image/user.png";
import { usePathname } from "next/navigation";
import NotificationCount from "./NotificationCount";
import { useGetProfileQuery } from "@/redux/api/userApi";
import { TUser } from "@/types/userType";
import { TResponse } from "@/types/global";
import { Button, Skeleton } from "antd";
import { RxCross2 } from "react-icons/rx";
import { IoMenu } from "react-icons/io5";
import Link from "next/link";
import SkeletonAvatar from "antd/es/skeleton/Avatar";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSocket } from "@/lib/Providers/SocketProvider";
import { useAppSelector } from "@/redux/hooks";

const Navbar = ({ collapsed, setCollapsed }: { collapsed: boolean; setCollapsed: any }) => {
 
  const { socket, socketLoading } = useSocket();
  const user = useAppSelector((state) => state.auth.user);
  const pathname = usePathname();
  const { data, isLoading } = useGetProfileQuery([]);
  const result = (data as TResponse<TUser>)?.data;
  const navbarTitle = pathname.split("/")[1];



  return (
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
        <NotificationCount />
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
  );
};

export default Navbar;
