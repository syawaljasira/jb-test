import type { Metadata } from "next";
import { PPAgrandir, Bagoss, Sohne } from "@/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "Juicebox Test",
  description:
    "Juicebox Assignment Test - A seven-slide interactive onboarding project",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${PPAgrandir.variable} ${Bagoss.variable} ${Sohne.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col font-sans overflow-hidden"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
