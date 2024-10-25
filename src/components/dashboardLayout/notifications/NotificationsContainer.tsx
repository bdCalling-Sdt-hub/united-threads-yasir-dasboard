"use client";
import {
  useGetNotificationsQuery,
  useSeenNotificationsMutation,
} from "@/redux/api/notificationApi";
import { useAppSelector } from "@/redux/hooks";
import { TResponse } from "@/types/global";
import { TNotification } from "@/types/notificationTypes";
import { Divider, Pagination } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { MdOutlineNotificationsNone } from "react-icons/md";

const NotificationsContainer = () => {
  //const [currentPage, setCurrentPage] = useState(1);
  //const pageSize = 10;

  //// Calculate start and end index for slicing the doctors data based on the current page and page size
  //const startIndex = (currentPage - 1) * pageSize;
  //const endIndex = startIndex + pageSize;

  //// Slice the data for the current page
  //const currentnotifications = notificationData.slice(startIndex, endIndex);

  const [seenNotifications] = useSeenNotificationsMutation();

  const query = [
    { label: "limit", value: "100000000000000" },
    {
      label: "seen",
      value: "false",
    },
  ];

  const user = useAppSelector((state) => state.auth.user);
  const { data } = useGetNotificationsQuery(query, {
    skip: !user,
  });

  const notifications = data as TResponse<TNotification[]>;

  useEffect(() => {
    if (data) {
      seenNotifications(null);
    }
  }, [data, seenNotifications]);

  return (
    <div>
      <div className='min-h-[80vh] bg-[#434344] text-[#F8FAFC] p-7'>
        <h1 className='text-2xl text-mainColor font-medium'>Notifications</h1>
        <Divider></Divider>
        <div className='mt-9 grid grid-cols-1 gap-8'>
          {notifications?.data?.map((notification, inx) => (
            <div key={inx} className='flex gap-4 items-center'>
              <div className='bg-[#FFFFFF] p-2 rounded'>
                <MdOutlineNotificationsNone size={24} color='#8ABA51' />
              </div>
              <div>
                <h4 className='text-lg font-medium'>{notification.message}</h4>
                <p className='text-[#8ABA51]'>{moment(notification.createdAt).fromNow()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* pagination */}
      {/*<div className='w-max mt-3 ml-auto'>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={notificationData.length}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false} // Disable page size changer if unnecessary
        />
      </div>*/}
    </div>
  );
};

export default NotificationsContainer;
