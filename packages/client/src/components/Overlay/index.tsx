import React from "react";

import styles from "./Overlay.module.scss";

type OverlayType = "illegal" | "possible" | "valid";

type OverlayProps = {
  type: OverlayType;
};

const colorMap: Record<OverlayType, Color> = {
  illegal: "red",
  possible: "yellow",
  valid: "lime",
};

export default function Overlay({ type }: OverlayProps) {
  return (
    <div
      className={`${styles.overlay} ${styles[`${colorMap[type]}Overlay`]}`}
      role={type}
    />
  );
}
