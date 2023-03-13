import React, { useState, ReactNode } from "react";

import { useTheme } from "../../contexts";

import styles from "./SideView.module.scss";

type SideViewProps = {
  children?: ReactNode;
};

export default function SideView({ children }: SideViewProps) {
  const { theme } = useTheme();
  const [show, setShow] = useState<boolean>();

  return (
    <>
      <div
        className={`${styles.sideViewToggle} ${
          styles[show ? "shown" : "hidden"]
        }`}
        id="side-view-toggle"
      >
        <button onClick={() => setShow(!show)}>{show ? ">" : "<"}</button>
      </div>
      <section
        className={`${styles.sideView} ${styles[show ? "shown" : "hidden"]} ${
          styles[theme]
        }`}
        id="side-view"
      >
        {show && <div className={styles.wrapper}>{children}</div>}
      </section>
    </>
  );
}
