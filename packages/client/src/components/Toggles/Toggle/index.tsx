import React, { MouseEvent, ReactNode } from "react";

import styles from "./Toggle.module.scss";

type ToggleProps = {
  className?: string;
  onToggle: (event?: MouseEvent) => void;
  on: boolean;
  children?: ReactNode;
};

export default function Toggle({
  onToggle,
  on,
  className,
  children,
}: ToggleProps) {
  const value = on ? 1 : 0;
  return (
    <label className={`${styles.toggle} ${className}`}>
      <input type="checkbox" onClick={onToggle} value={value} />
      {children}
    </label>
  );
}
