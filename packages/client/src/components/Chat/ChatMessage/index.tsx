import React from "react";

import styles from "./ChatMessage.module.scss";

type ChatMessageProps = { children: string; colorOverride?: Color; };

export default function ChatMessage({ children, colorOverride }: ChatMessageProps) {
  return (
    <div className={styles.chatMessage}>
      <p className={`${styles.text}${colorOverride ? ` ${styles[colorOverride]}` : ""}`}>
        {children}
      </p>
    </div>
  );
}
