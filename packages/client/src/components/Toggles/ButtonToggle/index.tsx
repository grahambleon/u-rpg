import React, { MouseEvent } from "react";

import Toggle from "../Toggle";

import fallbackOn from "./images/fallbackOn.png";
import fallbackOff from "./images/fallbackOff.png";

import styles from "./ButtonToggle.module.scss";

type ButtonToggleProps = {
  imagePaths?: {
    on: string;
    off: string;
  };
  on: boolean;
  onToggle: (event: MouseEvent) => void;
  className?: string;
};

export default function ButtonToggle({
  imagePaths,
  on,
  onToggle,
  className,
}: ButtonToggleProps) {
  return (
    <Toggle
      className={`${styles.buttonToggle} ${className}`}
      on={on}
      onToggle={onToggle}
    >
      <img
        src={on ? imagePaths?.on ?? fallbackOn : imagePaths?.off ?? fallbackOff}
        alt={`button toggle toggled-${on ? "on" : "off"}`}
      />
    </Toggle>
  );
}
