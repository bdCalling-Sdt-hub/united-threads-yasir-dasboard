import Image from "next/image";
import { Paperclip } from "lucide-react";
import { Send } from "lucide-react";
import userImg from "@/assets/image/messageUser.png";
import userImg2 from "@/assets/image/user.png";
import { CircleOff } from "lucide-react";
import { Button, Divider, Input, Upload } from "antd";
import ReceiverMsgCard from "./ReceiverMsgCard";
import OwnerMsgCard from "./OwnerMsgCarda";

const MessageContainer = () => {
  return (
    <div className="lg:mx-auto ">
      <div className="relative z-10 flex flex-col rounded-xl rounded-t-xl border-t-8 border-t-primaryBlack px-10 py-8 lg:flex-row">
        {/* right */}
        <div className="flex flex-col justify-between lg:flex-grow lg:px-8">
          <div className=" flex items-center justify-between border-b border-opacity-[40%] pb-1">
            <div className="flex items-center gap-x-5">
              <div className="w-[25%]">
                <Image
                  src={userImg}
                  alt="user image"
                  className="aspect-square w-full rounded-full"
                />
              </div>

              <div className="lg:flex-grow">
                <h3 className="text-xl font-semibold text-black ">
                  Florencio 
                </h3>

                <div className="mt-1 flex items-center gap-x-2">
                  {/* Active/Online Indicator */}
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <p className="text-black border-t-black">Online</p>
                </div>
              </div>
            </div>

            <button className="flex items-center gap-x-2">
              <CircleOff size={20} color="#d55758" />
              <p className="text-xl text-black">Block</p>
            </button>
          </div>

          <div className="max-h-full space-y-8 overflow-hidden pt-8">
            <div className="flex items-start gap-x-4">
              <Image
                src={userImg}
                alt="user's image"
                className="h-[50px] w-[50px] rounded-full"
              />
              <div className="max-w-[50%] space-y-3 overflow-hidden">
                <ReceiverMsgCard message={"omg, this is amazing"} />
                <ReceiverMsgCard message={"Lorem ipsum dolor sit amet"} />
                <ReceiverMsgCard
                  message={
                    "omg, thi perspiciatis consectetur mollitia laboriosam itaque enim officia aut nemo quibusdam?"
                  }
                />
              </div>
            </div>

            <div className="flex flex-row-reverse items-start gap-x-4">
              <Image
                src={userImg2}
                alt="user's image"
                className="h-[50px] w-[50px] rounded-full"
              />
              <div className="flex max-w-[50%] flex-col items-end space-y-3">
                <OwnerMsgCard message={"How are you?"} />
                <OwnerMsgCard
                  message={
                    "Lorem ipsum dolor sit... I'll be there in 2 mins ⏰ "
                  }
                />
              </div>
            </div>

            <div className="flex items-start gap-x-4">
              <Image
                src={userImg}
                alt="user's image"
                className="h-[50px] w-[50px] rounded-full"
              />
              <div className="max-w-[50%] space-y-3">
                <ReceiverMsgCard message={"omg, this is amazing"} />
                <ReceiverMsgCard message={"Lorem ipsum dolor sit amet"} />
                <ReceiverMsgCard
                  message={
                    "omg, thi perspiciatis consectetur mollitia laboriosam itaque enim officia aut nemo quibusdam?"
                  }
                />
              </div>
            </div>

            <div className="flex flex-row-reverse items-start gap-x-4">
              <Image
                src={userImg2}
                alt="user's image"
                className="h-[50px] w-[50px] rounded-full"
              />
              <div className="flex max-w-[50%] flex-col items-end space-y-3">
                <OwnerMsgCard message={"How are you?"} />
                <OwnerMsgCard
                  message={
                    "Lorem ipsum dolor sit... I'll be there in 2 mins ⏰ "
                  }
                />
              </div>
            </div>

            <div className="flex items-start gap-x-4">
              <Image
                src={userImg}
                alt="user's image"
                className="h-[50px] w-[50px] rounded-full"
              />
              <div className="max-w-[50%] space-y-3">
                <ReceiverMsgCard message={"Lorem ipsum dolor sit amet"} />
                <ReceiverMsgCard message={"omg, this is amazing"} />
              </div>
            </div>
          </div>
          <Divider></Divider>
          <div className="mt-10 flex w-full items-center gap-x-6">
            <Upload>
              <Paperclip role="button" />
            </Upload>
            <div className="flex w-full items-stretch gap-x-4">
              <Input
                size="large"
                placeholder="Type a message"
                type="text"
                className="w-full border-2 border-black/50 bg-transparent "
              />
              <Button className="border-2 border-black/50 bg-transparent py-6">
                <Send color="#000" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageContainer;
