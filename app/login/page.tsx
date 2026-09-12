import type { Metadata } from "next";

import LoginPage from "@/components/auth/login-page";

export const metadata: Metadata = {
  title: "Sign in — Samadhan.ai",
  description:
    "Unified gateway for the Citizen, University and Company portals on Samadhan.ai.",
};

export default function SignInPage() {
  return <LoginPage />;
}