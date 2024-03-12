import { ProfileForm } from "@/components/SignUp";
import React from "react";
import { getProviders } from "next-auth/react";
import { createUser } from "@/lib/actions/user.actions";
const Page = async () => {
  const providers = await getProviders();
  if (!providers) return null;
  /*   if (providers?.credentials) {
    delete providers?.credentials
  } */
  return (
    <div className="center-container-col">
      <ProfileForm providers={providers} createUser={createUser} />
    </div>
  );
};

export default Page;
