import React, { useCallback, useState, ChangeEvent, FormEvent } from "react";
import { useSocket } from "../../../contexts";

export default function ChatEntry() {
  const { socket } = useSocket();
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
    <form onSubmit={onFormSubmission}>
      <input onChange={onTextEntry} value={typedText} type="text" />
      <input type="submit" />
    </form>
  );
}
