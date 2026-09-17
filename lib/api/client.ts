"use client";

import { useCallback, useEffect, useState } from "react";

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(status: number, message: string, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

interface ApiErrorPayload {
  error?: string;
}

interface RequestOptions {
  method: string;
  body?: unknown;
  headers?: Record<string, string>;
}

async function request<T>(path: string, options: RequestOptions): Promise<T> {
  let response: Response;
  try {
    response = await fetch(path, {
      method: options.method,
      headers: {
        Accept: "application/json",
        ...(options.body !== undefined ? { "Content-Type": "application/json" } : {}),
        ...options.headers,
      },
      credentials: "include",
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    });
  } catch {
    throw new ApiError(0, "Network error. Please check your connection.");
  }

  if (!response.ok) {
    let data: unknown;
    let message = response.statusText || "Request failed";
    try {
      data = await response.json();
      const body = data as ApiErrorPayload;
      if (typeof body?.error === "string") message = body.error;
    } catch {
      data = undefined;
    }
    throw new ApiError(response.status, message, data);
  }

  if (response.status === 204) return undefined as T;

  try {
    return (await response.json()) as T;
  } catch {
    return undefined as T;
  }
}

export const api = {
  get: <T>(path: string) => request<T>(path, { method: "GET" }),
  post: <T>(path: string, body?: unknown) => request<T>(path, { method: "POST", body }),
  patch: <T>(path: string, body?: unknown) => request<T>(path, { method: "PATCH", body }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

export async function signOut(): Promise<void> {
  try {
    await api.post("/api/auth/logout");
  } catch {
    // ignore logout failures
  }
}

export interface AuthUser {
  id: string;
  name: string;
  role: string;
  email: string;
  orgId?: string;
}

export interface LoginResult {
  user: AuthUser & { _id?: string };
}

export function isSessionFlag(storageKey: string): boolean {
  return typeof window !== "undefined" && window.sessionStorage.getItem(storageKey) === "true";
}

export function setSessionFlag(storageKey: string): void {
  try {
    window.sessionStorage.setItem(storageKey, "true");
  } catch {
    /* storage unavailable */
  }
}

export async function loginWithCredentials(
  email: string,
  password: string,
): Promise<LoginResult> {
  return api.post<LoginResult>("/api/auth/login", { email, password });
}

export interface OtpSendResult {
  ok: boolean;
  expiresIn: number;
  devCode?: string;
}

export interface OtpVerifyResult {
  user: AuthUser & { _id?: string };
}

export async function sendOtpCode(email: string): Promise<OtpSendResult> {
  return api.post<OtpSendResult>("/api/auth/otp/send", { email });
}

export async function verifyOtpCode(email: string, code: string): Promise<OtpVerifyResult> {
  return api.post<OtpVerifyResult>("/api/auth/otp/verify", { email, code });
}

export async function fetchSession(): Promise<{ user: AuthUser } | null> {
  try {
    return await api.get<{ user: AuthUser }>("/api/auth/session");
  } catch {
    return null;
  }
}

export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
  refetch: () => Promise<void>;
}

export function useApi<T>(fetcher: () => Promise<T>): ApiState<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    try {
      const result = await fetcher();
      setData(result);
      setError(null);
    } catch (err) {
      setData(null);
      setError(isApiError(err) ? err : new ApiError(0, "Request failed"));
    }
  }, [fetcher]);

  useEffect(() => {
    let cancelled = false;
    fetcher().then(
      (result) => {
        if (cancelled) return;
        setData(result);
        setError(null);
        setLoading(false);
      },
      (err) => {
        if (cancelled) return;
        setData(null);
        setError(isApiError(err) ? err : new ApiError(0, "Request failed"));
        setLoading(false);
      },
    );
    return () => {
      cancelled = true;
    };
  }, [fetcher]);

  return { data, loading, error, refetch };
}

export function useApiGet<T>(path: string): ApiState<T> {
  const get = useCallback(() => api.get<T>(path), [path]);
  return useApi<T>(get);
}