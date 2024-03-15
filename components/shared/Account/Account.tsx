"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const Account = () => {
  const { data } = useSession();
  const user = data?.user;
  if (!user) return null;
  const { name, email } = user;
  return (
    <div className="flex items-start gap-2 ">
      <Image
        alt="user picture"
        width={15}
        height={15}
        src="/assets/logos/logo.svg"
      />
      <div className="flex flex-col items-start justify-center">
        <p className="p3-regular capitalize">{name}</p>
        <p className="p3-regular text-light-300">{email}</p>
      </div>
    </div>
  );
};

export default Account;
