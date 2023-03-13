import React from "react";

import ImageButton from "../Buttons/ImageButton";

import button from "../Toggles/ButtonToggle/images/fallbackOn.png";

import styles from "./SideViewControls.module.scss";

type SideViewControlsProps = {};

export default function SideViewControls({}: SideViewControlsProps) {
  return (
    <section className={styles.sideViewControls}>
      <div className={styles.wrapper}>
        {[...Array(7).keys()].map((control) => (
          <ImageButton image={button} onClick={() => {}} />
        ))}
      </div>
    </section>
  );
}
