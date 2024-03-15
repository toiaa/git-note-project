import LogIn from "@/components/LogIn";
import React from "react";
import { getProviders } from "next-auth/react";

const Page = async () => {
  const providers = await getProviders();
  if (!providers) return null;
  return <LogIn providers={providers} />;
};

export default Page;
