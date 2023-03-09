import React from "react";
import { Chat, SocketPrintOut } from "../../components";

import { SocketProvider } from "../../contexts";

import styles from "./App.module.scss";

export default function App() {

  return (
    <div className={styles.app}>
      <SocketProvider>
        <SocketPrintOut />
        <Chat />
      </SocketProvider>
    </div>
  );
}
