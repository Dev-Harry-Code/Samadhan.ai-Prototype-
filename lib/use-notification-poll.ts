"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "@/lib/api/client";

export interface NotificationItem {
  id: string;
  type: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
}

export interface NotificationPoll {
  notifications: NotificationItem[];
  unread: number;
  loading: boolean;
  refresh: () => Promise<void>;
}

export function useNotificationPoll(intervalMs = 5000): NotificationPoll {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(true);
  const mountedRef = useRef(true);

  const refresh = useCallback(async () => {
    try {
      const data = await api.get<{
        notifications: NotificationItem[];
        unread: number;
      }>("/api/notifications?limit=20");
      if (!mountedRef.current) return;
      setNotifications(data.notifications ?? []);
      setUnread(data.unread ?? 0);
    } catch {
      // silently ignore — user may not be logged in
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    const initialFetch = setTimeout(() => void refresh(), 0);
    const id = setInterval(refresh, intervalMs);
    return () => {
      mountedRef.current = false;
      clearTimeout(initialFetch);
      clearInterval(id);
    };
  }, [refresh, intervalMs]);

  return { notifications, unread, loading, refresh };
}
