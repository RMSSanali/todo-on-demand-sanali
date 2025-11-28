// TOD/tod/apps-web/app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import { Navbar } from "@/components/navbar/Navbar";

export const metadata = {
  title: "TOD",
  description: "Build your perfect to-do system",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
