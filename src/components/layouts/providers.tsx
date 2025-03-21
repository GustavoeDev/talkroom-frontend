"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

import { useEffect } from "react";

import dayjs from "dayjs";
import "dayjs/locale/pt-br";

import { io } from "socket.io-client";
import Header from "../shared/header";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ChatAuth from "@/assets/chat-auth";

export const socket = io(process.env.NEXT_PUBLIC_API_BASE_URL as string, {
  transports: ["websocket"],
});

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  useEffect(() => {
    dayjs.locale("pt-br");
  }, []);

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <div className="w-full min-h-screen bg-zinc-100 dark:bg-zinc-950 flex justify-center items-center gap-44">
        <ChatAuth className="h-96 w-96" />
        {children}
      </div>
    </div>
  );
}

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="border border-zinc-400 dark:border-zinc-800 cursor-pointer"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
