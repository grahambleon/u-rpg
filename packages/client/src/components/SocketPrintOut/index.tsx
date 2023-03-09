import React from "react";
import { useSocket } from "../../contexts";

type RollProps = {
    choices: any[];
};

export default function SocketPrintOut() {
    const { socket } = useSocket();

    function roll({ choices }: RollProps): string {
        if (socket && socket.id) {
            let accumulator = 0;
            let digitCount = 0;

            console.log(socket);
            socket.id.replace(/\D/g, "").split("").forEach((digit) => { ++digitCount; const int = parseInt(digit); if (isNaN(int)) accumulator += 0; accumulator += parseInt(digit) });

            let selector = (accumulator / digitCount) + 1;
            if (isNaN(selector)) return "only letters for my friendan Brendan";
            while (selector > choices.length - 1) {
                selector /= choices.length
            }
            console.log(selector);
            return choices[Math.round(selector)];
        } else {
            return "";
        }
    }

    const thing = roll({ choices: ["pizza", "gaming", "going in", "PEBBING!"] });

    return (
        <>
            Hello I like pizza. <br />
            {socket.id}
        </>
    );
}
