import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { io, Socket } from "socket.io-client";

export type SocketContextType = {
  socketId?: string;
};

export type SocketProviderProps = {
  children?: ReactNode;
};

export const SocketContext = createContext<SocketContextType>({});

export function SocketProvider({ children }: SocketProviderProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [socketId, setSocketId] = useState<string>("");
  const socketRef = useRef<Socket>(io());
  console.log(socketRef.current);

  useEffect(() => {
    socketRef.current.on("connect", () => {
      setSocketId(socketRef.current.id);
    })
  }, []);

  return (
  <SocketContext.Provider value={{ socketId: socketRef.current.id }}>
    {children}
  </SocketContext.Provider>
  );
}

export function useSocket() {
  if (!SocketContext) {
    throw new Error("SocketContext must be defined!")
  }
  return useContext<SocketContextType>(SocketContext)
}
