"use client";

import { Button } from "../ui/button";
import { ModeToggle } from "../layouts/providers";
import Logo from "@/assets/logo";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const path = usePathname();

  return (
    <header className="w-full p-6 flex items-center justify-between dark:bg-zinc-900">
      <Logo className="light:text-black dark:text-white" />
      <div className="flex items-center gap-6">
        <ModeToggle />
        <Link href={path === "/auth/signin" ? "/auth/signup" : "/auth/signin"}>
          <Button className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer text-white font-medium transition-colors duration-300">
            {path === "/auth/signin" ? "Registrar-se" : "Fazer login"}
          </Button>
        </Link>
      </div>
    </header>
  );
}
