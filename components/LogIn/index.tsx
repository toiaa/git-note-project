"use client";
import React from "react";
import { signIn, ClientSafeProvider } from "next-auth/react";
import Link from "next/link";
import { ProvidersInterface } from "@/types/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const LogIn = ({ providers }: { providers: ProvidersInterface }) => {
  const formSchema = z.object({
    email: z.string().min(1, {
      message: "No email provided.",
    }),
    password: z.string().min(1, {
      message: "No password provided.",
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values", values);
    signIn("credentials", {
      email: values.email,
      password: values.password,
    });
  }

  return (
    <div className="flex w-[400px] flex-col justify-center gap-4">
      <h1 className="h2-bold">Log in</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="p3-medium text-light-300">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    className="border-none bg-dark-700"
                    placeholder="Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="p3-medium text-light-300">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    className="border-none bg-dark-700"
                    placeholder="Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
      <Link
        href="/signup"
        className="p3-medium cursor-pointer text-center text-light-300 underline"
      >
        I don&apos;t have an account
      </Link>
      <div className="flex w-full flex-col gap-2">
        <div className="p3-medium w-full text-center text-light-300">or</div>
        <div className="flex flex-col-reverse items-center justify-center gap-4">
          {Object.values(providers).map((provider: ClientSafeProvider) => {
            if (!provider) return null;
            if (provider.id !== "credentials") {
              return (
                <Button
                  key={provider.id}
                  type="button"
                  className="w-full gap-1.5 bg-dark-700 text-light-300"
                  onClick={() => signIn(provider.id)}
                >
                  <Image
                    alt={`${provider.name} logo`}
                    src={`/assets/logos/${provider.id}.svg`}
                    width={20}
                    height={20}
                  />
                  Contunue with {provider.name}
                </Button>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default LogIn;
