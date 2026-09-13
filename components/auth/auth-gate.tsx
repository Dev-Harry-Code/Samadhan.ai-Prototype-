"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";

function subscribeStorage() {
  return () => {};
}

function readFlag(storageKey: string) {
  return () =>
    typeof window !== "undefined" && window.sessionStorage.getItem(storageKey) === "true";
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
  const authed = useSyncExternalStore(subscribeStorage, readFlag(storageKey), () => false);

  useEffect(() => {
    if (!authed) router.replace(redirectTo);
  }, [authed, redirectTo, router]);

  if (!authed) {
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
