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

const formSchema = z.object({
  fullName: z.string().min(2, {
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
  createUser: (fullName: string, email: string, password: string) => void;
  providers: ProvidersInterface;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createUser(values.fullName, values.email, values.password);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create user");
    }
  };
  return (
    <div className="flex w-[400px] flex-col gap-2">
      <h1 className="h1-bold text-center">Sign Up</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="label-form">Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Full Name" {...field} />
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
                <FormLabel className="label-form">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="label-form">Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} />
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
      <div className="p3-medium w-full text-center text-light-300">or</div>
      <div className="flex flex-col items-center justify-center gap-1.5">
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
}
