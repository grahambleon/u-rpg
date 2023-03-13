import React, { MouseEvent, useCallback, useState } from "react";

import ButtonToggle from "../ButtonToggle";

import styles from "./MenuToggle.module.scss";

type MenuToggleProps = {};

export default function MenuToggle({}: MenuToggleProps) {
  const [menuState, setMenuState] = useState<boolean>(false);
  // this shouldn't be here in a broader implementation
  // state should be handled by some parent context
  // that passes down relevant get/set to this

  const handleToggle = useCallback((e: MouseEvent) => {
    e.preventDefault();
    setMenuState(!menuState);
  }, [menuState]);

  return (
    <div id="menu-toggle" className={styles.menuToggle}>
      <label
        className={styles.label}
        htmlFor="menu-toggle"
        onClick={handleToggle}
      >
        <span className={`${styles.labelText} ${menuState ? styles.blue : ""}`}>
          MENU
        </span>
      </label>
      <ButtonToggle onToggle={handleToggle} on={menuState} />
    </div>
  );
}
