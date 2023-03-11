import React from "react";

import ChatMessage from "../ChatMessage";
import { Message } from "../";

import styles from "./ChatBody.module.scss";

type ChatBodyProps = { messages: Message[] };

export default function ChatBody({ messages }: ChatBodyProps) {
  return (
    <div className={styles.chatBody}>
      {messages.map((message, index) => (
        <ChatMessage key={index} colorOverride={message.colorOverride}>
          {`${message.id ? `${message.id}: ` : ""}${message.text}`}
        </ChatMessage>
      ))}
    </div>
  );
}
