import React from "react";

import AppLayout from "../../layouts/AppLayout";
import { MouseEventProvider, SocketProvider } from "../../contexts";

import styles from "./App.module.scss";
import { ThemeProvider } from "../../contexts/ThemeContext";
import Board from "../../components/Board";

export default function App() {
  return (
    <div className={styles.app}>
      <ThemeProvider>
        <MouseEventProvider>
          <SocketProvider>
            <AppLayout>
              <Board />
            </AppLayout>
          </SocketProvider>
        </MouseEventProvider>
      </ThemeProvider>
    </div>
  );
}
