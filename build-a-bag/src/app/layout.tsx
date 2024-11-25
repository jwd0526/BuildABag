"use client";

import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import Nav from "./components/Nav/Nav";
import './globals.css'

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <SessionProvider><Nav />{children}</SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;