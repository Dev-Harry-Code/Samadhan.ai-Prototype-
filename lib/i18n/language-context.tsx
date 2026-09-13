"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { LANGUAGES, Lang, translations } from "@/lib/i18n/translations";
import { AKSHAT_TRANSLATIONS } from "@/lib/i18n/akshat-translations";

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "samadhan.lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved && LANGUAGES.some((l) => l.code === saved)) {
        setLangState(saved);
        document.documentElement.lang = saved;
      }
    } catch {
      /* storage unavailable */
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
      document.documentElement.lang = l;
    } catch {
      /* storage unavailable */
    }
  };

  const t = (key: string) =>
    translations[lang]?.[key] ??
    AKSHAT_TRANSLATIONS[lang]?.[key] ??
    translations.en?.[key] ??
    AKSHAT_TRANSLATIONS.en?.[key] ??
    key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}