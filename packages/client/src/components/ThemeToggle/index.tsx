import React from "react";

import { useTheme } from "../../contexts";

import styles from "./ThemeToggle.module.scss";

type ThemeToggleProps = {};

export default function ThemeToggle({}: ThemeToggleProps) {
  const { theme, changeTheme } = useTheme();

  return (
    <label className={styles.themeToggle}>
      <input type="checkbox" onClick={changeTheme}/>
      <span className={`${styles.slider} ${styles[theme]}`}></span>
    </label>
  );
}
