"use client";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ProvidersInterface } from "@/types";
import { ClientSafeProvider, signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});
export function ProfileForm({
  createUser,
  providers,
}: {
  createUser: (name: string, email: string, password: string) => void;
  providers: ProvidersInterface;
}) {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const { name, email, password } = values;
      await createUser(name, email, password);
      setLoading(false);
    } catch (error) {
      console.error("SERA ACAAAA??", error);
      throw new Error("Failed to create user");
    }
  };
  return (
    <div className="flex w-[400px] flex-col justify-center gap-4">
      <h1 className="h2-bold">Create an account</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="p3-medium text-light-300">
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input
                    className="border-none bg-dark-700"
                    placeholder="Full Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    placeholder="Password"
                    className="border-none bg-dark-700"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full bg-primary-500 text-dark-900" type="submit">
            {loading ? "loading" : "Create an account"}
          </Button>
        </form>
      </Form>
      <Link
        href="/login"
        className="p3-medium cursor-pointer text-center text-light-300 underline"
      >
        Already have an account
      </Link>
      <div className="p3-regular w-full text-center text-light-300">or</div>
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
                Continue with {provider.name}
              </Button>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
