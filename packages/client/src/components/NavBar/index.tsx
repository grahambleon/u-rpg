import React from "react";

import { useTheme } from "../../contexts";

import styles from "./NavBar.module.scss";

type NavBarProps = {};

export default function NavBar({}: NavBarProps) {
  const { theme } = useTheme();
  console.log(theme);
  console.log(styles[theme]);
  return (
    <section className={`${styles.navBar} ${styles[theme]}`} id="nav-bar">
      <nav>NavBar</nav>
    </section>
  );
}
