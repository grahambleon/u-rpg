import React from "react";

import ChatMessage from "../ChatMessage";
import { Message } from "../";
import { useMouse } from "../../../contexts";

import styles from "./ChatBody.module.scss";

type ChatBodyProps = { messages: Message[] };

export default function ChatBody({ messages }: ChatBodyProps) {
  const { popMenu } = useMouse();
  return (
    <div className={styles.chatBody}>
      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          colorOverride={message.colorOverride}
          onContextMenu={(event) => {
            popMenu(event, {
              type: "chat",
              values: {
                id: message.id,
                socketId: message.id,
              },
            });
          }}
        >
          {`${message.id ? `${message.id}: ` : ""}${message.text}`}
        </ChatMessage>
      ))}
    </div>
  );
}
