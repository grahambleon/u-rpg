import React from "react";

import Tile from "../Tile";

import styles from "./TileRow.module.scss";

type TileRowProps = {
  row: number;
  width: number;
};

export default function TileRow({ row, width }: TileRowProps) {
  return (
    <div className={styles.tileRow}>
      {[...Array(width).keys()].map((column) => (
        <Tile row={row} column={column} />
      ))}
    </div>
  );
}
