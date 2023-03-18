import React from "react";
import { useDrag, DragPreviewImage } from "react-dnd";

import itemTypes from "../../../constants/DnD-ItemTypes";

import tokenDefault from "../../../images/tokenDefault.png";

import styles from "./Token.module.scss";

type TokenProps = {
  id: number;
  tileId: number;
  x: number;
  y: number;
};

export default function Token({ id, tileId, x, y }: TokenProps) {
  const [{ isDragging }, dragRef, preview] = useDrag({
    type: itemTypes.TOKEN,
    item: {
      id,
      tileId,
      x,
      y,
    },
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <>
      <DragPreviewImage connect={preview} src={tokenDefault} />
      <div
        id={`token-${id}`}
        className={styles.token}
        ref={dragRef}
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        <img className={styles.tokenImg} src={tokenDefault} alt="token" />
      </div>
    </>
  );
}
