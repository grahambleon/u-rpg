import React from "react";

import { useTheme } from "../../../contexts";
import SliderToggle from "../SliderToggle";

import darkmode from "./images/darkmode.png";
import lightmode from "./images/lightmode.png";

import styles from "./ThemeToggle.module.scss";

type ThemeToggleProps = {};

export default function ThemeToggle({}: ThemeToggleProps) {
  const { theme, changeTheme } = useTheme();

  return (
    <div className={styles.themeToggle}>
      <span className={styles.labelImg}>
        <img
          src={theme === "light" ? lightmode : darkmode}
          alt={`theme icon ${theme}mode`}
        />
      </span>
      <SliderToggle
        className={styles[theme]}
        onToggle={changeTheme}
        on={theme === "light"}
      />
    </div>
  );
}
