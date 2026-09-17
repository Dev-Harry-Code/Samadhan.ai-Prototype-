"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";

import { fetchSession, isSessionFlag } from "@/lib/api/client";

function subscribeStorage() {
  return () => {};
}

function readFlag(storageKey: string) {
  return () => isSessionFlag(storageKey);
}

export function AuthGate({
  storageKey,
  redirectTo,
  children,
}: {
  storageKey: string;
  redirectTo: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const flagged = useSyncExternalStore(subscribeStorage, readFlag(storageKey), () => false);

  useEffect(() => {
    if (!flagged) {
      router.replace(redirectTo);
      return;
    }
    let cancelled = false;
    void fetchSession().then((session) => {
      if (cancelled) return;
      if (!session) {
        try {
          window.sessionStorage.removeItem(storageKey);
        } catch {
          /* storage unavailable */
        }
        router.replace(redirectTo);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [flagged, storageKey, redirectTo, router]);

  if (!flagged) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-slate-700">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary-600 border-t-transparent" />
          <span className="text-xs font-semibold">Checking access…</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}