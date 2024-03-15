import { ProfileForm } from "@/components/SignUp";
import React from "react";
import { getProviders } from "next-auth/react";
import { createUser } from "@/lib/actions/user.actions";
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
        <ProfileForm providers={providers} createUser={createUser} />
      </div>
    </div>
  );
};

export default Page;
