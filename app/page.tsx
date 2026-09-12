import { AkshatCitizenApp } from "@/components/akshat/citizen-app";
import { AuthGate } from "@/components/auth/auth-gate";

export default function Home() {
  return (
    <AuthGate storageKey="samadhan.citizen" redirectTo="/login?tab=citizen">
      <AkshatCitizenApp />
    </AuthGate>
  );
}