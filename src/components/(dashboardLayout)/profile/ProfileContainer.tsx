"use client";
import { Tabs, Upload } from "antd";
import Image from "next/image";
import { CiEdit } from "react-icons/ci";
import userImg from "@/assets/image/userImage.png";
import EditProfileForm from "./EditProfileForm";
import ChangePasswordForm from "./ChangePasswordForm";

const ProfileContainer = () => {
  return (
    <div className="bg-[#434344] py-8 rounded font-urbanist">
      <div className="bg-[#232323] flex items-center justify-center h-[200px]">
        <div className="flex items-center gap-x-5">
          <div className="group relative">
            <Image
              src={userImg}
              alt="user image"
              className="size-28 rounded-full"
            />
            <Upload>
              <div className="bg-white text-black text-lg p-2 rounded-full flex items-center justify-center absolute bottom-5 right-0 transition-all duration-300 ease-in-out">
                <CiEdit />
              </div>
            </Upload>
          </div>

          <div className="text-white">
            <h2 className="font-bold text-4xl">Akash Sharif</h2>
            <p className="text-xl mt-1">Admin</p>
          </div>
        </div>
      </div>

      {/* forms */}
      <div className="w-1/2 mx-auto mt-16 mb-10">
        <Tabs defaultActiveKey="1" centered>
          <Tabs.TabPane tab="Edit Profile" key="1">
            <EditProfileForm />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Change Password" key="2">
            <ChangePasswordForm />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfileContainer;
