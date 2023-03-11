import React, { ReactNode } from "react";

import { AppBody, Chat, Footer, NavBar } from "../../components";

type AppLayoutProps = {
  children?: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <NavBar />
      <Chat />
      <AppBody>{children}</AppBody>
      <Footer />
    </>
  );
}
