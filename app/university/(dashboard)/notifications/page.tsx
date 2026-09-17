import { PortalNotificationsPage } from "@/components/portal/notifications-page";

export const metadata = {
  title: "Notifications | University Portal | Samadhan AI",
  description: "Live issue status updates for your assigned civic projects.",
};

export default function Page() {
  return (
    <PortalNotificationsPage
      title="Notifications"
      accent="bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-md shadow-emerald-500/20"
    />
  );
}