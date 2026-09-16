import { PortalNotificationsPage } from "@/components/portal/notifications-page";

export const metadata = {
  title: "Notifications | NGO Portal | Samadhan AI",
  description: "Live updates on critical civic issues and your field operations.",
};

export default function Page() {
  return (
    <PortalNotificationsPage
      title="Notifications"
      accent="bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/20"
    />
  );
}