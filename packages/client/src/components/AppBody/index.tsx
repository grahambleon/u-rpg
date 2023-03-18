import React, { ReactNode } from "react";

import { useTheme } from "../../contexts";

import styles from "./AppBody.module.scss";

type AppBodyProps = {
  children?: ReactNode;
};

export default function AppBody({ children }: AppBodyProps) {
  const { theme } = useTheme();
  return (
    <section className={`${styles.appBody} ${styles[theme]}`} id="app-body">
      {children}
    </section>
  );
}
