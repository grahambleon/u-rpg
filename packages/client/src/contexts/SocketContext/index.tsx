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
  socket?: Socket;
};

export type SocketProviderProps = {
  children?: ReactNode;
};

export const SocketContext = createContext<SocketContextType>({});

export function SocketProvider({ children }: SocketProviderProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const socketRef = useRef<Socket>(io());
  console.log(socketRef.current);

  return (
  <SocketContext.Provider value={{ socket: socketRef.current }}>
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
