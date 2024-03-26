import * as React from "react";

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "dark" | "shad";
}
const inputVariants = cva(
  "flex h-10 w-full rounded-md px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent  file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "p3-bold w-full bg-primary-500 text-dark-900 hover:opacity-75 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90",
        dark: "bg-dark-700 text-light-300 hover:bg-opacity-75",
        shad: "bg-white placeholder:text-slate-500 focus-visible:ring-slate-950 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 ",
      },
      defaultVariants: {
        variant: "dark",
      },
    },
  },
);
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
