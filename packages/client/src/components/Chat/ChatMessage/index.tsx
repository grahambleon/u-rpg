import React from "react";

import styles from "./ChatMessage.module.scss";

type ChatMessageProps = {
  children: string;
  colorOverride?: Color;
  onContextMenu?: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export default function ChatMessage({
  children,
  colorOverride,
  onContextMenu,
}: ChatMessageProps) {
  return (
    <div className={styles.chatMessage} onContextMenu={onContextMenu}>
      <p
        className={`${styles.text}${
          colorOverride ? ` ${styles[colorOverride]}` : ""
        }`}
      >
        {children}
      </p>
    </div>
  );
}
