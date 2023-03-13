import React from "react";

import styles from "./Tile.module.scss";

type TileProps = {
  column: number;
  row: number;
};

export default function Tile({ column, row }: TileProps) {
  return (
    <div className={styles.tile}>
      {column},{row}
    </div>
  );
}
