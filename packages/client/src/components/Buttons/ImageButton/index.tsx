import React, { MouseEvent } from "react";

import Button from "../Button";

import styles from "./ImageButton.module.scss";

type ImageButtonProps = {
  className?: string;
  image: string;
  onClick: (event: MouseEvent) => void;
};

export default function ImageButton({
  className,
  image,
  onClick,
}: ImageButtonProps) {
  return (
    <Button onClick={onClick} className={`${styles.imageButton} ${className}`}>
      <img src={image} alt="button image" />
    </Button>
  );
}
