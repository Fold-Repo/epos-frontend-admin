const isBrowser = () => typeof window !== "undefined";

export const setCookie = (
  key: string,
  value: string,
  maxAge: number = 60 * 60 * 24 * 7
) => {
  if (!isBrowser()) return;
  document.cookie = `${key}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; samesite=lax`;
};

export const getCookie = (key: string): string | null => {
  if (!isBrowser()) return null;
  const match = document.cookie.match(new RegExp(`(^| )${key}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
};

export const clearCookie = (key: string) => {
  if (!isBrowser()) return;
  document.cookie = `${key}=; path=/; max-age=0`;
};
