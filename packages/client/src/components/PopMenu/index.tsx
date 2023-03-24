import React, { ReactNode } from "react";

import { useTheme } from "../../contexts";

import styles from "./PopMenu.module.scss";

type PopMenuProps = {
  children?: ReactNode;
  top: number;
  left: number;
};

export default function PopMenu({ children, top, left }: PopMenuProps) {
  const { theme } = useTheme();
  return (
    <section
      className={`${styles.popMenu} ${styles[theme]}`}
      style={{ top, left }}
      role="alertdialog"
      id="pop-menu"
    >
      {children}
    </section>
  );
}
