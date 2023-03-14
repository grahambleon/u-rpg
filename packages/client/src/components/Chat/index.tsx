import React, { useEffect, useState } from "react";

import { useSocket, useTheme } from "../../contexts";
import ChatBody from "./ChatBody";
import ChatEntry from "./ChatEntry";

import styles from "./Chat.module.scss";

export type Message = { text: string; id?: string; colorOverride?: Color };

export default function Chat() {
  const { socket } = useSocket();
  const { theme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "Server",
      text: "Welcome to d'chat! Be the most pro that u can to do!!!",
      colorOverride: "orange",
    },
    {
      text: "===================",
    },
  ]);

  useEffect(() => {
    socket.on("message broadcast", (message: Omit<Message, "isSender">) => {
      const parsedMessage: Message = {
        text: message.text,
        id: message.id.slice(0, 4),
        colorOverride: message.id === socket.id ? "lime" : undefined,
      };
      setMessages([...messages, parsedMessage]);
    });
  }, [messages]);

  return (
    <section className={`${styles.chat} ${styles[theme]}`} id="chat">
      <ChatBody messages={messages} />
      <ChatEntry />
    </section>
  );
}
