import React from "react";
import { useDrag, DragPreviewImage } from "react-dnd";

import { useMouse } from "../../../contexts";

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
  const { focus, popMenu, selectFocus } = useMouse();

  //mocks
  const name = "token";
  const hitpoints = 37;
  const description = "A token.";

  return (
    <>
      <DragPreviewImage connect={preview} src={tokenDefault} />
      <div
        id={`token-${id}`}
        className={`${styles.token}${
          focus?.info?.name === name ? ` ${styles.focused}` : ""
        }`}
        ref={dragRef}
        style={{ opacity: isDragging ? 0.5 : 1 }}
        onClick={(event) => {
          selectFocus(event, {
            name,
            hitpoints,
            description,
          });
        }}
        onContextMenu={(event) => {
          popMenu(event, {
            type: "actor",
            values: {
              name,
              x,
              y,
              id,
            },
          });
        }}
      >
        <img className={styles.tokenImg} src={tokenDefault} alt="token" />
      </div>
    </>
  );
}
