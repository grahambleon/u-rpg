import React, { useCallback, useState, ChangeEvent, FormEvent } from "react";
import { useSocket } from "../../../contexts";

export default function ChatEntry(){
    const {socket} = useSocket();
    const [typedText, setTypedText] = useState<string>("");

    const onFormSubmission = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        socket.emit("chat message", typedText);
        setTypedText(""); 
    }, [typedText]);
    const onTextEntry = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setTypedText(event.currentTarget.value);
    }, []);

    return (
        <form onSubmit={onFormSubmission}>
            <input onChange={onTextEntry} value={typedText} type="text" /> 
            <input type="submit" /> 
        </form>
    )
};
