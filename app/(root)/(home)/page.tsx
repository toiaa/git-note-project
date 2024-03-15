import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container-col size-full h-full flex-col">
      <Logo />
      <div className="flex flex-col items-center gap-2">
        <Link href="/login" className="w-full">
          <Button className="w-full bg-dark-700">Log in</Button>
        </Link>
        <Link href="/signup" className="w-full">
          <Button className="w-full bg-dark-700">Sign up </Button>
        </Link>{" "}
        <Link href="/onboarding" className="w-full">
          <Button className="w-full bg-dark-700">On Boarding </Button>
        </Link>
      </div>
    </main>
  );
}
