import { InputProps } from "@/components/ui/input";
import { BuiltInProviderType } from "next-auth/providers/index";
import { ClientSafeProvider } from "next-auth/react";
import { LiteralUnion } from "react-hook-form";

export type ProvidersInterface = Record<
  LiteralUnion<BuiltInProviderType, string>,
  ClientSafeProvider
>;

export interface InputInterface extends InputProps {
  label?: string;
}
