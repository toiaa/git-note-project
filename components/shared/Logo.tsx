import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="flex items-end justify-center gap-1.5">
      <Image
        alt="DevFlow logo"
        width={41}
        height={50}
        src="/assets/logos/logo.svg"
      />
      <h1 className="h1-bold">GitNote</h1>
    </div>
  );
};

export default Logo;
