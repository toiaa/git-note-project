import React from "react";
import Logo from "./Logo";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex w-full items-center justify-center p-5">
      <Link href="/">
        <Logo />
      </Link>
    </div>
  );
};

export default Header;
