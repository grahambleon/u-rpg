import React, { useState } from "react";

import ThemeToggle from "../Toggles/ThemeToggle";
import { useTheme } from "../../contexts";

import styles from "./Footer.module.scss";
import ButtonToggle from "../Toggles/ButtonToggle";
import MenuToggle from "../Toggles/MenuToggle";

type FooterProps = {};

export default function ({}: FooterProps) {
  const { theme } = useTheme();
  const [buttonState, setButtonState] = useState<boolean>(false);

  return (
    <section className={`${styles.footer} ${styles[theme]}`} id="footer">
      <ThemeToggle />
      <MenuToggle />
    </section>
  );
}
