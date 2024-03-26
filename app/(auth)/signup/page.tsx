import { ProfileForm } from "@/components/SignUp";
import React from "react";
import { getProviders } from "next-auth/react";
import { createUser } from "@/lib/actions/user.actions";
const Page = async () => {
  const providers = await getProviders();
  if (!providers) return null;

  return <ProfileForm providers={providers} createUser={createUser} />;
};

export default Page;
