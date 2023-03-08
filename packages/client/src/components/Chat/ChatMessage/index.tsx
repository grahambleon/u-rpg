import React from "react";

type ChatMessageProps = { children: string }

export default function ChatMessage({ children }: ChatMessageProps){

    return (
        <div>
            <p>
                {children}
            </p>
        </div>
    )
};
