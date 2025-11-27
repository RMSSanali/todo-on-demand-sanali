// TOD/tod/apps-web/app/layout.tsx
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import type { ReactNode } from "react";

export const metadata = {
  title: "TOD",
  description: "Build your perfect to-do system",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <div className="p-4 flex justify-end">
            {/* language switcher in the top-right corner */}
            {/* <LanguageSwitcher /> */}
          </div>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
