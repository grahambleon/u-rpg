import React, { useEffect, useState } from "react";
import { useSocket } from "../../contexts";

export default function SocketPrintOut() {
  const { socket, isConnected } = useSocket();
  const [thing, setThing] = useState<string>("");

  useEffect(() => {
    async function fetchKey(socketId: string) {
      try {
        console.log("trying...");
        const response = await fetch(`/api/math/pick?id=${socketId}`);
        if (!response.ok) throw new Error("error in fetch");
        const json = await response.json();
        setThing(json);
      } catch (error) {
        console.error(error)
      }
    }

    console.log("socketPrintOut");
    console.log(socket);
    if (socket.id && isConnected) {
      console.log("has id");
      fetchKey(socket.id);
    }
  }, [socket, isConnected]);

  return (
    <>
      {Boolean(thing) && `Hello I like ${thing}`}
      <br />
      {socket.id}
    </>
  );
}
