import LogIn from "@/components/LogIn";
import React from "react";
import { getProviders } from "next-auth/react";

import Header from "@/components/shared/header";

const Page = async () => {
  const providers = await getProviders();
  if (!providers) return null;
  return (
    <div className="w-full">
      <div className="">
        <Header />
      </div>
      <div className="container-custom mt-4 flex items-center justify-center self-center pt-36 ">
        <LogIn providers={providers} />
      </div>
    </div>
  );
};

export default Page;
