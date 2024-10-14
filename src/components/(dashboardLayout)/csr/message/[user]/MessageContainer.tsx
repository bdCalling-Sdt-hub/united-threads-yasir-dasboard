/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import userImg from "@/assets/image/messageUser.png";
import userImg2 from "@/assets/image/user.png";
import { useSocket } from "@/lib/Providers/SocketProvider";
import { useUploadFileMutation } from "@/redux/api/messageApi";
import { selectUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { Button, Divider } from "antd";
import { CircleOff, Loader2, Paperclip, Send, XCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import OwnerMsgCard from "./OwnerMsgCarda";
import ReceiverMsgCard from "./ReceiverMsgCard";

// Define the type for form data
type MessageFormData = {
  message: string;
};

const MessageContainer = ({ receiverId }: { receiverId: string }) => {
  const [files, setFiles] = useState<any[]>([]); // Handle multiple files
  const [imgPreviews, setImgPreviews] = useState<any[]>([]); // Multiple image previews
  const [messageLoading, setMessageLoading] = useState(false);
  const [messages, setMessages] = useState<any[]>([]); // State for previous and new messages
  const [activeUsers, setActiveUsers] = useState<string[]>([]);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [typing, setTyping] = useState(false);

  const user = useAppSelector(selectUser);
  const userId = user?._id;
  const [uploadFile] = useUploadFileMutation();
  const { socket } = useSocket();

  // Initialize the form with react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MessageFormData>(); // Use the defined type

  useEffect(() => {
    if (socket && userId) {
      // Emit the event to request message page information (this does not return data directly)
      socket.emit("message-page", { userId });

      // Listen for "user-details" event
      socket.on("user-details", (response: any) => {
        console.log(response);
        if (response.success) {
          setUserDetails(response.data);
        } else {
          toast.error(response.message || "Could not fetch user details");
        }
      });

      // Listen for "my-messages" event (to get the previous messages)
      socket.on("my-messages", (response: any) => {
        if (response.success) {
          setMessages(response.data); // Set the previous messages
        } else {
          toast.error(response.message || "Could not fetch previous messages");
        }
      });

      // Cleanup listeners on unmount
      return () => {
        socket.off("user-details");
        socket.off("my-messages");
      };
    }
  }, [socket, userId]);

  // Listen for incoming new messages
  useEffect(() => {
    if (socket && userId) {
      // Clean up any existing listeners before adding a new one
      socket.off("new-message::" + userId);

      // Add the listener for new messages
      socket.on("new-message::" + userId, (messageData: any) => {
        console.log(messageData, "message data");
        setMessages((prevMessages) => [...prevMessages, messageData]); // Append new message to the existing list
      });

      // Add the listener for active users
      socket.on("online-users", (data) => {
        setActiveUsers(data?.data);
      });

      // Cleanup function to remove the listener on component unmount or when dependencies change
      return () => {
        socket.off("new-message::" + userId);
        socket.off("online-users");
      };
    }
  }, [socket, userId]);

  // Handle file selection and generate image previews
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(selectedFiles); // Set files for upload

      // Generate image previews
      const previews = selectedFiles.map((file) => URL.createObjectURL(file));
      setImgPreviews(previews);
    }
  };

  // Handle image removal
  const handleRemoveImage = (index: number) => {
    const newFiles = files.filter((_, fileIndex) => fileIndex !== index);
    const newPreviews = imgPreviews.filter((_, previewIndex) => previewIndex !== index);
    setFiles(newFiles); // Remove the selected image from the files array
    setImgPreviews(newPreviews); // Remove the preview
  };

  // Clean up the image URLs when component unmounts or files change to avoid memory leaks
  useEffect(() => {
    return () => {
      imgPreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [imgPreviews]);

  // Handle form submission using react-hook-form
  const onSubmit: SubmitHandler<MessageFormData> = async (data) => {
    console.log(data);

    if (!files.length && !data.message) {
      toast.error("Please enter a message or upload an image");
      return;
    }

    setMessageLoading(true);

    const formData = new FormData();

    // Append files as "files[]"
    if (files.length) {
      files.forEach((file) => {
        formData.append("files", file);
      });
    }

    try {
      let images = [];

      if (files.length) {
        const res = await uploadFile(formData).unwrap();
        if (res.success) {
          if (res.data) {
            images = res.data;
          }
        } else {
          toast.error(res.message || "Something went wrong");
        }
      }

      const payload = {
        text: data.message,
        file: images,
        receiverId: receiverId,
      };

      socket?.emit("send-message", payload);

      reset(); // Reset the form after submission
      setFiles([]); // Clear files after sending
      setImgPreviews([]); // Clear previews after sending
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Something went wrong during upload");
    } finally {
      setMessageLoading(false);
    }
  };



  useEffect(() => {
    if (socket && userId) {
      socket.emit("typing", )
    }
  })


  return (
    <div className='lg:mx-auto '>
      <div className='relative z-10 flex flex-col rounded-xl rounded-t-xl border-t-8 border-t-primaryBlack px-10 py-8 lg:flex-row'>
        {/* Right - Chat Section */}
        <div className='flex flex-col justify-between lg:flex-grow lg:px-8'>
          <div className='flex items-center justify-between border-b border-opacity-[40%] pb-1'>
            <div className='flex items-center gap-x-5'>
              <div className='w-[25%]'>
                <Image
                  src={
                    userDetails && userDetails?.profilePicture
                      ? userDetails?.profilePicture
                      : userImg2
                  }
                  width={50}
                  height={50}
                  alt='user image'
                  className='aspect-square w-full rounded-full'
                />
              </div>
              <div className='lg:flex-grow'>
                <h3 className='text-xl font-semibold text-black '>
                  {userDetails?.firstName} {userDetails?.lastName}{" "}
                </h3>
                <div className='mt-1 flex items-center gap-x-2'>
                  <div
                    className={`h-2 w-2 rounded-full ${
                      activeUsers.find((u: any) => u.id === receiverId)
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  />
                  <p className='text-black border-t-black'>
                    {" "}
                    {activeUsers.find((u: any) => u.id === receiverId) ? (
                      "Online"
                    ) : (
                      <span className='text-gray-400'>Offline</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <button className='flex items-center gap-x-2'>
              <CircleOff size={20} color='#d55758' />
              <p className='text-xl text-black'>Block</p>
            </button>
          </div>

          {/* Message Preview Section */}
          <div className='max-h-full space-y-8 overflow-hidden pt-8'>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === userId ? "flex-row-reverse" : "flex-row"
                } items-start gap-x-4`}
              >
                <Image
                  src={msg.sender === userId ? userImg2 : userImg}
                  alt="user's image"
                  className='h-[50px] w-[50px] rounded-full'
                />
                <div className='max-w-[50%] space-y-3 overflow-hidden'>
                  {msg.sender === userId ? (
                    <OwnerMsgCard createdAt={msg.createdAt} file={msg.file} message={msg.text} />
                  ) : (
                    <ReceiverMsgCard message={msg.text} createdAt={msg.createdAt} file={msg.file} />
                  )}
                </div>
              </div>
            ))}
          </div>

          <Divider />

          {/* Preview selected images */}
          <div className='flex gap-2 mt-4'>
            {imgPreviews.map((preview, index) => (
              <div key={index} className='relative'>
                <Image
                  src={preview}
                  alt={`Preview ${index}`}
                  className='h-[100px] w-auto rounded-md'
                  width={300}
                  height={300}
                />
                <button className='absolute top-0 right-0' onClick={() => handleRemoveImage(index)}>
                  <XCircle size={20} color='red' />
                </button>
              </div>
            ))}
          </div>

          {/* File input and message send */}
          <div className='mt-10 flex w-full items-center gap-x-6'>
            <label htmlFor='file'>
              <input
                type='file'
                multiple // Allow multiple file selection
                onChange={handleFileChange}
                name='file'
                id='file'
                className='sr-only'
              />
              <Paperclip role='button' />
            </label>

            {/* Form submission using react-hook-form */}
            <form onSubmit={handleSubmit(onSubmit)} className='flex w-full items-stretch gap-x-4'>
              <input
                placeholder='Type a message'
                type='text'
                className='w-full border-2 border-black/50 bg-transparent rounded-lg px-4 py-2'
                {...register("message", { required: false })}
              />
              <Button
                htmlType='submit'
                disabled={messageLoading}
                className='border-2 border-black/50 bg-transparent py-6'
              >
                {messageLoading ? (
                  <Loader2 size={22} className='animate-spin' />
                ) : (
                  <Send color='#000' />
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageContainer;
