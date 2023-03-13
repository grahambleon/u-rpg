import React, { MouseEvent } from "react";

import Toggle from "../Toggle";

import styles from "./SliderToggle.module.scss";

type SliderToggleProps = {
  className?: string;
  on: boolean;
  onToggle: (event: MouseEvent) => void;
};

export default function SliderToggle({
  className,
  on,
  onToggle,
}: SliderToggleProps) {
  return (
    <Toggle
      className={`${styles.sliderToggle} ${className}`}
      onToggle={onToggle}
      on={on}
    >
      <span className={styles.slider}></span>
    </Toggle>
  );
}
