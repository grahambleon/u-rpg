import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";

export type SocketContextType = {
  socket?: Socket;
  isConnected?: boolean;
  attemptMove?: (coords: Coordinates) => void;
  sendChat?: (text: string) => void;
};

export type SocketProviderProps = {
  children?: ReactNode;
};

export const SocketContext = createContext<SocketContextType>({});

const socket = io();
export function SocketProvider({ children }: SocketProviderProps) {
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  const attemptMove = useCallback((coords: Coordinates) => {
    if (socket && socket.connected)
      socket.emit("chat message", `Made a move to ${coords.x},${coords.y}`);
  }, []);

  const sendChat = useCallback(
    (text: string) => {
      if (socket && socket.connected) socket.emit("chat message", text);
    },
    [socket]
  );

  return (
    <SocketContext.Provider
      value={{ socket, isConnected, attemptMove, sendChat }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  if (!SocketContext) {
    throw new Error("SocketContext must be defined!");
  }
  return useContext<SocketContextType>(SocketContext);
}
