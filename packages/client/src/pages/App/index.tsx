import React from "react";

import { TestContextChild } from "../../components";
import { TestProvider } from "../../contexts";

import styles from "./App.module.scss";

export default function App() {
  return (
    <div className={styles.app}>
      <TestProvider>
        <TestContextChild />
      </TestProvider>
    </div>
  );
}
