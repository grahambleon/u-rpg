import React from "react";

import ThemeToggle from "../ThemeToggle";
import { useTheme } from "../../contexts";

import styles from "./Footer.module.scss";

type FooterProps = {};

export default function ({}: FooterProps) {
  const { theme } = useTheme();

  return (
    <section className={`${styles.footer} ${styles[theme]}`} id="footer">
      <ThemeToggle />
    </section>
  );
}
