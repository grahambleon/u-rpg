import React from "react";
import ChatMessage from "../ChatMessage";
import { Message } from "../";

type ChatBodyProps = { messages: Message[] };

export default function ChatBody({ messages }: ChatBodyProps) {

    return (
        <div>
            {messages.map((message, index) => <ChatMessage key={index}>{`${message.id}: ${message.text}`}</ChatMessage>)}
        </div>
    )
};
