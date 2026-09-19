"use client";

import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import type { Issue, ScreenId } from "@/lib/akshat-types";
import type { DraftIssue } from "@/lib/types";
import { api } from "@/lib/api/client";
import type { AnalyzeResponse } from "@/server/ai/types";
import { storeIssueToAkshat } from "@/lib/akshat-mapper";
import { useStore } from "@/lib/store/store";
import { Header } from "@/components/akshat/common/header";
import { BottomNav } from "@/components/akshat/common/bottom-nav";
import { CivicBackground } from "@/components/akshat/common/civic-background";
import { LanguageSelectorModal } from "@/components/akshat/common/language-modal";
import { LanguagePreferenceDialog } from "@/components/akshat/common/language-preference-dialog";
import { AkshatProvider } from "@/components/akshat/akshat-context";
import { HomeScreen } from "@/components/akshat/screens/home-screen";
import { ReportIssueScreen } from "@/components/akshat/screens/report-screen";
import { AIAnalysisScreen } from "@/components/akshat/screens/ai-analysis-screen";
import { AIConfirmationScreen } from "@/components/akshat/screens/ai-confirmation-screen";
import { IssuesFeedScreen } from "@/components/akshat/screens/issues-feed-screen";
import { IssueDetailsScreen } from "@/components/akshat/screens/issue-details-screen";
import { UserProfileScreen } from "@/components/akshat/screens/user-profile-screen";

const EASE_MODAL: [number, number, number, number] = [0.16, 1, 0.3, 1];

function makePendingId(): string {
  return `LOK-${String(10000 + Math.floor(Math.random() * 90000)).slice(-4)}`;
}

export function AkshatCitizenApp() {
  const [currentScreen, setScreen] = useState<ScreenId>("home");
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  const [draft, setDraft] = useState<DraftIssue | null>(null);
  const [analysis, setAnalysis] = useState<AnalyzeResponse | null>(null);
  const { issues: storeIssues, submitIssue } = useStore();

  const [pendingId] = useState<string>(() => makePendingId());

  const feedIssues = useMemo(() => storeIssues.map(storeIssueToAkshat), [storeIssues]);

  const runAnalysis = useCallback(async (d: DraftIssue) => {
    try {
      const res = await api.post<AnalyzeResponse>("/api/ai/analyze", {
        description: d.description,
        category: d.category,
        location: { lat: d.location.lat, lng: d.location.lng, label: d.location.label, district: d.location.district },
        photo: d.photo || true,
        peopleAffected: d.peopleAffected,
      });
      setAnalysis(res);
    } catch {
      setAnalysis(null);
    }
  }, []);

  const navigateTo = (newScreen: ScreenId) => {
    setScreen(newScreen);
  };

  const handleDraftChange = useCallback((d: DraftIssue) => {
    setDraft(d);
  }, []);

  const handleAddNewReport = useCallback(async (): Promise<{ id: string } | null> => {
    if (!draft) return null;
    const created = await submitIssue(draft);
    if (!created) return null;
    const akshatIssue = storeIssueToAkshat(created);
    setSelectedIssue(akshatIssue);
    return akshatIssue;
  }, [draft, submitIssue]);

  const handleBeginAnalysis = useCallback(() => {
    setScreen("ai_analysis");
    if (draft) void runAnalysis(draft);
  }, [draft, runAnalysis]);

  const getVariants = () => {
    if (currentScreen === "report") {
      return {
        initial: { y: "100%", opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: "100%", opacity: 0 },
        transition: { duration: 0.45, ease: EASE_MODAL },
      };
    }

    if (currentScreen === "ai_analysis" || currentScreen === "ai_confirmation") {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.4, ease: "easeInOut" as const },
      };
    }

    if (currentScreen === "issues_feed") {
      return {
        initial: { opacity: 0, y: 15 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -15 },
        transition: { duration: 0.35, ease: "easeOut" as const },
      };
    }

    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.3, ease: "easeInOut" as const },
    };
  };

  const variants = getVariants();

  const confidencePercent = analysis?.trustScore?.score ?? 96.8;

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return <HomeScreen setScreen={navigateTo} setSelectedIssue={setSelectedIssue} />;
      case "report":
        return (
          <ReportIssueScreen
            setScreen={(s) => {
              if (s === "ai_analysis") {
                handleBeginAnalysis();
              } else {
                setScreen(s);
              }
            }}
            onDraftChange={handleDraftChange}
          />
        );
      case "ai_analysis":
        return <AIAnalysisScreen setScreen={navigateTo} />;
      case "ai_confirmation":
        return (
          <AIConfirmationScreen
            setScreen={navigateTo}
            onSubmitReport={handleAddNewReport}
            issueId={pendingId ?? undefined}
            confidence={confidencePercent}
          />
        );
      case "issues_feed":
        return (
          <IssuesFeedScreen
            setScreen={navigateTo}
            setSelectedIssue={setSelectedIssue}
            feedIssues={feedIssues}
          />
        );
      case "issue_details":
        if (!selectedIssue) {
          return (
            <IssuesFeedScreen
              setScreen={navigateTo}
              setSelectedIssue={setSelectedIssue}
              feedIssues={feedIssues}
            />
          );
        }
        return <IssueDetailsScreen setScreen={navigateTo} selectedIssue={selectedIssue} />;
      case "profile":
        return <UserProfileScreen setScreen={navigateTo} />;
      default:
        return <HomeScreen setScreen={navigateTo} setSelectedIssue={setSelectedIssue} />;
    }
  };

  const isBottomNavVisible = [
    "home",
    "report",
    "ai_confirmation",
    "issues_feed",
    "issue_details",
    "profile",
  ].includes(currentScreen);

  return (
    <AkshatProvider>
      <div className="relative flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900 transition-colors duration-300 selection:bg-teal-100 selection:text-teal-900">
        <CivicBackground className="fixed" />

        <LanguageSelectorModal />
        <LanguagePreferenceDialog />

        <Header currentScreen={currentScreen} setScreen={navigateTo} />

        <main className="relative z-10 w-full flex-1 overflow-x-hidden">
          <div className="mx-auto w-full max-w-7xl px-0 sm:px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScreen}
                initial={variants.initial}
                animate={variants.animate}
                exit={variants.exit}
                transition={variants.transition}
                className="w-full"
              >
                {renderScreen()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        {isBottomNavVisible && <BottomNav currentScreen={currentScreen} setScreen={navigateTo} />}
      </div>
    </AkshatProvider>
  );
}