import React, { MouseEvent, ReactNode } from "react";

import styles from "./Button.module.scss";

type ButtonProps = {
  onClick: (event: MouseEvent) => void;
  className?: string;
  children?: ReactNode;
};

export default function Button({ onClick, className, children }: ButtonProps) {
  return (
    <label className={`${styles.button} ${className}`}>
      <input type="button" onClick={onClick} />
      {children}
    </label>
  );
}
