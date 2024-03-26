"use client";
import React from "react";
import Logo from "../Logo";
import { useSession } from "next-auth/react";

const MobileNav = () => {
  const session = useSession();
  console.log("session nav", session);
  return (
    <div className="flex flex-1 items-center justify-between p-4">
      <Logo />
    </div>
  );
};

export default MobileNav;
