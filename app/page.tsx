import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="center-container-col size-full flex-col">
      <Logo />
      <div className="flex flex-col items-center gap-2">
        <Link href="/login" className="w-full">
          <Button className="w-full bg-dark-700">Log in</Button>
        </Link>
        <Link href="/signup" className="w-full">
          <Button className="w-full bg-dark-700">Sign up </Button>
        </Link>
      </div>
    </main>
  );
}
