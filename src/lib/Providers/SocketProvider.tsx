"use client";
import { selectToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { createContext, useMemo, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext({});

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socketLoading, setSocketLoading] = useState(false);
  const token = useAppSelector(selectToken);
  const socket = useMemo(() => {
    if (token) {
      const socketStore = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
        transports: ["websocket"],
        auth: {
          token,
        },
      });
      socketStore.on("connect", () => {
        setSocketLoading(false);
        console.log("Connected to socket server");
      });
    }
  }, [token]);

  return (
    <SocketContext.Provider value={{ socket, socketLoading }}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
