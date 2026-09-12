"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { useLang } from "@/lib/i18n/language-context";
import {
  AKSHAT_LANGUAGES,
  AKSHAT_TRANSLATIONS,
  type AkshatLanguageInfo,
} from "@/lib/i18n/akshat-translations";

interface AkshatContextValue {
  t: (key: string, fallback?: string) => string;
  currentLanguageInfo: AkshatLanguageInfo;
  isLanguageModalOpen: boolean;
  setIsLanguageModalOpen: (open: boolean) => void;
  toggleLanguageModal: () => void;
}

const AkshatContext = createContext<AkshatContextValue | null>(null);

export function AkshatProvider({ children }: { children: ReactNode }) {
  const { lang } = useLang();
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  const t = useCallback(
    (key: string, fallback?: string): string => {
      const dict = AKSHAT_TRANSLATIONS[lang] ?? AKSHAT_TRANSLATIONS.en;
      if (dict[key]) return dict[key];
      if (AKSHAT_TRANSLATIONS.en[key]) return AKSHAT_TRANSLATIONS.en[key];
      return fallback ?? key;
    },
    [lang],
  );

  const currentLanguageInfo =
    AKSHAT_LANGUAGES.find((l) => l.code === lang) ?? AKSHAT_LANGUAGES[0];

  const toggleLanguageModal = useCallback(
    () => setIsLanguageModalOpen((open) => !open),
    [],
  );

  const value = useMemo(
    () => ({ t, currentLanguageInfo, isLanguageModalOpen, setIsLanguageModalOpen, toggleLanguageModal }),
    [t, currentLanguageInfo, isLanguageModalOpen, toggleLanguageModal],
  );

  return <AkshatContext.Provider value={value}>{children}</AkshatContext.Provider>;
}

export function useAkshat(): AkshatContextValue {
  const ctx = useContext(AkshatContext);
  if (!ctx) throw new Error("useAkshat must be used within an AkshatProvider");
  return ctx;
}