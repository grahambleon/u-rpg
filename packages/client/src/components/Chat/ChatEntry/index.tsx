import React, { useCallback, useState, ChangeEvent, FormEvent } from "react";

import { useSocket, useTheme } from "../../../contexts";

import styles from "./ChatEntry.module.scss";

export default function ChatEntry() {
  const { socket } = useSocket();
  const { theme } = useTheme();
  const [typedText, setTypedText] = useState<string>("");

  const onFormSubmission = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const text = typedText.trim();

      if(text === "") {
        return;
      }

      if (socket) {
        socket.emit("chat message", text);
        setTypedText("");
      }
    },
    [typedText, socket]
  );
  
  const onTextEntry = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      setTypedText(event.currentTarget.value);
    },
    []
  );

  return (
    <form
      onSubmit={onFormSubmission}
      className={`${styles.chatEntry} ${styles[theme]}`}
    >
      <input className={`${styles.submit} ${styles[theme]}`} type="submit" />
      <input
        className={styles.text}
        onChange={onTextEntry}
        value={typedText}
        type="text"
      />
    </form>
  );
}
