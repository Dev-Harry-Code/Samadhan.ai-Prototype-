"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import type { Issue, ScreenId } from "@/lib/akshat-types";
import { NEARBY_ISSUES, PRIMARY_ISSUE } from "@/lib/data/akshat-mock";
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

export function AkshatCitizenApp() {
  const [currentScreen, setScreen] = useState<ScreenId>("home");
  const [feedIssues, setFeedIssues] = useState<Issue[]>([PRIMARY_ISSUE, ...NEARBY_ISSUES]);
  const [selectedIssue, setSelectedIssue] = useState<Issue>(PRIMARY_ISSUE);

  const navigateTo = (newScreen: ScreenId) => {
    setScreen(newScreen);
  };

  const handleAddNewReport = () => {
    const newIssue: Issue = {
      id: "LOK-9428",
      title: "4-inch Fractured PVC Community Drinking Water Pipe",
      category: "Water Resources",
      description: "The main pipeline feeding the community water tap has been fractured for 3 weeks, leaving over 50 families without clean municipal drinking water.",
      location: "Village X, Ranchi, Jharkhand (Ward 14)",
      distance: "0.1 km away",
      peopleAffected: 50,
      severity: "High",
      status: "Under review",
      reportedBy: "You (Citizen Reporter)",
      reportedDaysAgo: 0,
      imageUrl: "https://images.pexels.com/photos/19156793/pexels-photo-19156793.jpeg?auto=compress&cs=tinysrgb&w=800",
      upvotes: 1,
      commentsCount: 0,
      updatesCount: 1,
      assignedUniversity: "BIT Mesra Hydrology",
      matchScore: 97,
    };

    setFeedIssues(prev => [newIssue, ...prev.filter(i => i.id !== newIssue.id)]);
    setSelectedIssue(newIssue);
  };

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

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return <HomeScreen setScreen={navigateTo} setSelectedIssue={setSelectedIssue} />;
      case "report":
        return <ReportIssueScreen setScreen={navigateTo} />;
      case "ai_analysis":
        return <AIAnalysisScreen setScreen={navigateTo} />;
      case "ai_confirmation":
        return (
          <AIConfirmationScreen setScreen={navigateTo} onSubmitReport={handleAddNewReport} />
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

        <main className="relative z-10 w-full flex-1">
          <div className="mx-auto w-full max-w-7xl">
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