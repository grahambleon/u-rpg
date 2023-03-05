import React from "react";
import { useSocket } from "../../contexts";

export default function SocketPrintOut(){
    const {socketId} = useSocket();
    
    console.log(socketId);
    return (
        <>
            {socketId}
        </>
    );
}