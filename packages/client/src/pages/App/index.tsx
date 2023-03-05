import React from "react";
import { SocketPrintOut } from "../../components";

import { SocketProvider } from "../../contexts";

import styles from "./App.module.scss";

export default function App() {
  return (
    <div className={styles.app}>
      <SocketProvider>
        Hello I like pizza. <br />
        <SocketPrintOut />
      </SocketProvider>
    </div>
  );
}
