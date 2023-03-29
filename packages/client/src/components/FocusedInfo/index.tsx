import React, { ReactNode } from "react";
import { useTheme } from "../../contexts";

import styles from "./FocusedInfo.module.scss";

type FocusedInfoProps = { children?: ReactNode };

export default function FocusedInfo({ children }: FocusedInfoProps) {
  const { theme } = useTheme();
  return (
    <section
      className={`${styles.focusedInfo} ${styles[theme]}`}
      role="alertdialog"
      id="pop-menu"
    >
      {children}
    </section>
  );
}
