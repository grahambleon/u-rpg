import React from "react";

import TileRow from "./TileRow";

import styles from "./Board.module.scss";

type BoardProps = {
  height?: number;
  width?: number;
};

export default function Board({ height = 100, width = 100 }: BoardProps) {
  return (
    <section className={styles.board} id="board">
      {[...Array(height).keys()].map((row) => (
        <TileRow row={row} width={width} />
      ))}
    </section>
  );
}
