import { InputProps } from "@/components/ui/input";
import { BuiltInProviderType } from "next-auth/providers/index";
import { ClientSafeProvider } from "next-auth/react";
import { LiteralUnion } from "react-hook-form";

type ProvidersInterface = Record<
  LiteralUnion<BuiltInProviderType, string>,
  ClientSafeProvider
>;

interface InputInterface extends InputProps {
  label?: string;
}
