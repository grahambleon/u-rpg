import React, { useEffect, useState } from "react";
import { useSocket } from "../../contexts";
import ChatBody from "./ChatBody";
import ChatEntry from "./ChatEntry";

export type Message = {text: string; id: string;};

export default function Chat() {
    const { socket } = useSocket();
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        socket.on("message broadcast", (message) => { console.log(message); console.log(messages); setMessages([...messages, message]) })
    }, [messages]);

    console.log("test");

    return (
        <section>
            <ChatBody messages={messages} />
            <ChatEntry />
        </section>
    )
};
