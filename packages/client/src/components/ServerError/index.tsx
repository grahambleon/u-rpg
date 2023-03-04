import React from "react";

import styles from "./ServerError.module.scss";

export default function ServerError() {
  return (
    <section className={styles.container}>
      <h2>Sorry, there was an error fetching data from the server.</h2>
    </section>
  );
}
