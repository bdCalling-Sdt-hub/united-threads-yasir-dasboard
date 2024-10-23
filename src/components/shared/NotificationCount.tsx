"use client";
import { useSocket } from "@/lib/Providers/SocketProvider";
import { useAppSelector } from "@/redux/hooks";
import { TChatList } from "@/types/global";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GoBell } from "react-icons/go";

const NotificationCount = () => {
  const [chatList, setChatList] = useState<TChatList[]>([]);
  const user = useAppSelector((state) => state.auth.user);

  const { socket } = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on(`chat-list::${user?._id}`, (data) => {
        setChatList(data?.data || []);
      });

      socket.on("notification::" + user?._id, (data) => {
        console.log(data);
      });
    }

    return () => {
      if (socket) {
        socket.off(`chat-list::${user?._id}`, (data) => {
          setChatList(data?.data || []);
        });
      }
    };
  }, [user, socket]);

  const unreadMessageCount = chatList
    ?.map((item) => item?.unreadMessageCount)
    .reduce((a, b) => a + b, 0);

  //const senderId = chatList[0]?.participants?.find((item) => item.user !== user?._id);
  const lastMessageSender =
    chatList[0]?.latestMessage.seen === false ? chatList[0]?.latestMessage.sender : null;
  return (
    <Link
      href={`${lastMessageSender ? "/csr/message/" + lastMessageSender : "/csr/quote-details"}`}
    >
      <div
        role='button'
        className='relative aspect-square size-12 rounded-full bg-info flex-item-center'
      >
        <GoBell size={20} />
        {unreadMessageCount > 0 && (
          <span className='absolute top-1.5 right-1.5 size-[18px] bg-warning text-primaryWhite rounded-full text-sm flex-item-center'>
            {unreadMessageCount}
          </span>
        )}
      </div>
    </Link>
  );
};

export default NotificationCount;
