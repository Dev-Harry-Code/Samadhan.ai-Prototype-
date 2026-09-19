"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Globe, MapPin, User } from "lucide-react";

import type { ScreenId } from "@/lib/akshat-types";
import { CITIZEN_NOTIFICATIONS } from "@/lib/data/akshat-mock";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAkshat } from "@/components/akshat/akshat-context";
import { SamadhanLogoIcon } from "@/components/akshat/common/samadhan-logo";
import { NotificationPanel } from "@/components/akshat/common/notification-panel";
import { useLang } from "@/lib/i18n/language-context";

interface HeaderProps {
  currentScreen: ScreenId;
  setScreen: (screen: ScreenId) => void;
}

const NAV_TABS: { id: ScreenId; labelKey: string; match?: ScreenId[] }[] = [
  { id: "home", labelKey: "navOverview" },
  { id: "issues_feed", labelKey: "navFeed", match: ["issues_feed", "issue_details"] },
  { id: "report", labelKey: "navReport" },
  { id: "profile", labelKey: "navProfile" },
];

function Brand({ onClick }: { onClick: () => void }) {
  const { t } = useAkshat();
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="group flex cursor-pointer items-center gap-2"
    >
      <SamadhanLogoIcon size={38} />
      <div className="flex flex-col">
        <span className="text-lg font-black leading-none tracking-tight text-slate-900">
          Samadhan<span className="text-teal-600">.ai</span>
        </span>
        <span className="mt-0.5 hidden text-[9px] font-semibold leading-none tracking-tight text-teal-700 lg:inline">
          {t("tagline", "Together for a Better Tomorrow")}
        </span>
      </div>
    </motion.div>
  );
}

export function Header({ currentScreen, setScreen }: HeaderProps) {
  const { t, currentLanguageInfo, setIsLanguageModalOpen } = useAkshat();
  const { t: rootT } = useLang();
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);
  const [readIds, setReadIds] = useState<string[]>([]);

  const unreadCount = CITIZEN_NOTIFICATIONS.filter((n) => !readIds.includes(n.id)).length;

  const openNotifications = () => setNotificationsOpen(true);
  const closeNotifications = () => setNotificationsOpen(false);
  const markRead = (id: string) => setReadIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  const markAllRead = () => setReadIds(CITIZEN_NOTIFICATIONS.map((n) => n.id));

  const isActive = (tab: (typeof NAV_TABS)[number]) =>
    tab.match ? tab.match.includes(currentScreen) : currentScreen === tab.id;

  return (
    <header className="sticky top-0 z-40">

      <div className="md:hidden">
        <div className="sticky top-2 z-40 flex justify-center px-3 pt-2">
          <div className="flex w-full max-w-md items-center justify-between gap-2 rounded-full bg-white/90 px-3 py-2 shadow-lg ring-1 ring-slate-900/10 backdrop-blur-xl">
            <Brand onClick={() => setScreen("home")} />
            <div className="flex items-center gap-1.5">
              <Button
                variant="secondary"
                round="full"
                size="sm"
                onClick={() => setIsLanguageModalOpen(true)}
                aria-label={rootT("profile.language")}
              >
                <span className="text-sm leading-none">{currentLanguageInfo.flag}</span>
              </Button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={openNotifications}
                className="relative grid h-8 w-8 place-items-center rounded-xl border border-slate-200 bg-slate-100 text-slate-700"
                aria-label="Open notifications"
              >
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-orange-500 px-1 text-[9px] font-bold text-white ring-2 ring-white">
                    {unreadCount}
                  </span>
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setScreen("profile")}
                className="grid h-8 w-8 place-items-center rounded-xl border border-slate-200 bg-teal-50 text-teal-700"
              >
                <User className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>


      <div className="hidden border-b border-slate-200/80 bg-white/90 shadow-xs backdrop-blur-xl md:block">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-6">
          <div className="flex items-center gap-3">
            <Brand onClick={() => setScreen("home")} />
            <div className="hidden items-center gap-1 rounded-xl border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 lg:flex">
              <MapPin className="h-3.5 w-3.5 text-teal-600" />
              <span>{t("cityLabel", "Jodhpur")}</span>
            </div>
          </div>

    
          <nav className="flex items-center gap-1.5">
            {NAV_TABS.map((tab) => {
              const active = isActive(tab);
              const isAuth = tab.id === "auth";
              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setScreen(tab.id)}
                  className={cn(
                    "rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all",
                    active
                      ? isAuth
                        ? "bg-teal-600 text-white shadow-xs"
                        : "border border-teal-200 bg-teal-50 text-teal-700 shadow-xs"
                      : isAuth
                        ? "border border-teal-200 bg-teal-50 text-teal-700 hover:bg-teal-100"
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
                  )}
                >
                  {t(tab.labelKey, "Sign In")}
                </motion.button>
              );
            })}
          </nav>

    
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              round="full"
              size="sm"
              onClick={() => setIsLanguageModalOpen(true)}
              title={t("changeLanguageTitle", "Change Platform Language")}
            >
              <span className="text-sm leading-none">{currentLanguageInfo.flag}</span>
              <span className="hidden font-semibold sm:inline">{currentLanguageInfo.nativeName}</span>
              <Globe className="h-3.5 w-3.5 text-teal-600" />
            </Button>

            <motion.button
              whileHover={{ scale: 1.1, boxShadow: "0 4px 14px rgba(249, 115, 22, 0.25)" }}
              whileTap={{ scale: 0.9 }}
              onClick={openNotifications}
              className="relative grid h-8 w-8 place-items-center rounded-xl border border-slate-200 bg-slate-100 text-slate-700"
              aria-label="Open notifications"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-orange-500 px-1 text-[9px] font-bold text-white ring-2 ring-white">
                  {unreadCount}
                </span>
              )}
            </motion.button>

            <motion.div
              whileHover={{ scale: 1.1, boxShadow: "0 4px 14px rgba(13, 148, 136, 0.25)" }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setScreen("profile")}
              className="cursor-pointer"
            >
              <Avatar className="h-8 w-8 rounded-xl border border-slate-200 bg-teal-50">
                <AvatarFallback className="rounded-xl bg-teal-50 text-teal-700">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </motion.div>
          </div>
        </div>
      </div>

      <NotificationPanel
        open={isNotificationsOpen}
        notifications={CITIZEN_NOTIFICATIONS}
        readIds={readIds}
        onClose={closeNotifications}
        onMarkRead={markRead}
        onMarkAllRead={markAllRead}
      />
    </header>
  );
}
