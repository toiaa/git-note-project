"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactElement } from "react";

const NextAuthProvider = ({ children }: { children: ReactElement }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthProvider;
