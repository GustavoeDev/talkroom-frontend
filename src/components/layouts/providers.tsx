"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "../ui/sonner";

import { useEffect } from "react";

import dayjs from "dayjs";
import "dayjs/locale/pt-br";

import { io } from "socket.io-client";

export const socket = io(process.env.NEXT_PUBLIC_API_URL as string);

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  useEffect(() => {
    dayjs.locale("pt-br");
  }, []);

  return (
    <NextThemesProvider {...props}>
      {children}
      <Toaster />
    </NextThemesProvider>
  );
}
