// src/lib/api.ts

/**
 * Simple typed API wrapper used across the app.
 * It automatically prefixes the public API URL, parses JSON, and normalises errors.
 */
export async function apiFetch<T>(endpoint: string, init?: RequestInit): Promise<T> {
  const base = process.env.NEXT_PUBLIC_API_URL ?? "";
  const url = `${base}${endpoint}`;
  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    const error = new Error(
      `API error ${response.status}: ${response.statusText}\n${errorBody}`,
    ) as any;
    error.status = response.status;
    error.body = errorBody;
    throw error;
  }
  return (await response.json()) as T;
}
