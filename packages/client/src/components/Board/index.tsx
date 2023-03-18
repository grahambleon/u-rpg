import React from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import TilesMap from "./TilesMap";
import { BoardMovementProvider } from "../../contexts";

import styles from "./Board.module.scss";

type BoardProps = {
  height?: number;
  width?: number;
};

export default function Board({ height = 10, width = 10 }: BoardProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <BoardMovementProvider height={height} width={width}>
        <section className={styles.board} id="board">
          <TilesMap />
        </section>
      </BoardMovementProvider>
    </DndProvider>
  );
}
