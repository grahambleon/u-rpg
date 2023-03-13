import React from "react";

import SideViewControls from "../SideViewControls";
import { useTheme } from "../../contexts";

import styles from "./NavBar.module.scss";

type NavBarProps = {};

export default function NavBar({}: NavBarProps) {
  const { theme } = useTheme();
  return (
    <section className={`${styles.navBar} ${styles[theme]}`} id="nav-bar">
      <div/>
      <SideViewControls />
    </section>
  );
}
