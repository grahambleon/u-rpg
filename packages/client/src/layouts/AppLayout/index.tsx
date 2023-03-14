import React, { ReactNode } from "react";

import { AppBody, Chat, Footer, NavBar, SideView } from "../../components";

type AppLayoutProps = {
  children?: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <NavBar />
      <SideView>
        <Chat />
      </SideView>
      <AppBody>{children}</AppBody>
      <Footer />
    </>
  );
}
