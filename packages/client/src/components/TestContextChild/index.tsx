import React from "react";
import { useTest } from "../../contexts";

export default function TestContextChild() {
  const { connectionMessage } = useTest();
  return <>{connectionMessage}</>;
}
