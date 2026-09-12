"use client";

import { ReactNode } from "react";
import { LanguageProvider } from "@/lib/i18n/language-context";
import { StoreProvider } from "@/lib/store/store";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <StoreProvider>{children}</StoreProvider>
    </LanguageProvider>
  );
}