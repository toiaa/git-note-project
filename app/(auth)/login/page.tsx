import LogIn from "@/components/LogIn";
import React from "react";
import { getProviders } from "next-auth/react";

import Header from "@/components/shared/header";

const Page = async () => {
  const providers = await getProviders();
  if (!providers) return null;
  return (
    <div className="grid grid-cols-3 grid-rows-4 justify-items-stretch gap-2 ">
      <div className="col-span-3 col-start-1">
        <Header />
      </div>
      <div className="col-span-1 col-start-2 row-span-2 w-[400px] justify-self-center">
        <LogIn providers={providers} />
      </div>
    </div>
  );
};

export default Page;
