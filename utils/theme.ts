/**
 * Returns true if system preference is currently dark mode.
 */
export function isSystemDark(): boolean {
  if (typeof window !== "undefined") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return false;
}

/**
 * Returns active user theme preference.
 */
export function getActiveTheme(
  theme: string | undefined,
  resolvedTheme: string | undefined,
): "dark" | "light" {
  if (theme === "system") {
    return resolvedTheme === "dark" ? "dark" : "light";
  }
  return theme === "dark" ? "dark" : "light";
}
