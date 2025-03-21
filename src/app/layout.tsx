import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./styles/globals.css";

import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";

const notoSans = Noto_Sans({
  variable: "--font-default",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Talk Room Web",
  description: "Uma sala de chat para conversar com seus amigos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${notoSans.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
