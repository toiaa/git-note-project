"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { signIn, ClientSafeProvider } from "next-auth/react";
import Link from "next/link";
import { Input } from "../ui/input";
import { ProvidersInterface } from "@/types/index";

const LogIn = ({ providers }: { providers: ProvidersInterface }) => {
  return (
    <div className="w-[400px]">
      <h1 className="h2-bold">Log in</h1>
      <div className="flex  flex-col gap-2">
        <Input type="email" placeholder="Email" className="input-form" />
        <Input type="password" placeholder="Password" className="input-form" />
        <Button
          className="bg-primary-500 text-dark-700"
          onClick={() => signIn("credentials", { username: {}, password: {} })}
        >
          Log In
        </Button>
        <Link
          href="/signup"
          className="p3-medium cursor-pointer text-center text-light-300 underline"
        >
          I don&apos;t have an account
        </Link>
      </div>
      <div className="flex w-full flex-col gap-2">
        <div className="p3-medium w-full text-center text-light-300">or</div>
        {Object.values(providers).map((provider: ClientSafeProvider) => {
          if (!provider) return null;
          if (provider.id !== "credentials") {
            return (
              <Button
                key={provider.id}
                type="button"
                className="w-full bg-dark-600 text-light-300"
                onClick={() => signIn(provider.id)}
              >
                Log In with {provider.name}
              </Button>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default LogIn;
