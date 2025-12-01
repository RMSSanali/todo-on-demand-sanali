// TOD/tod/apps-web/lib/auth.ts

export type AuthUser = {
  username: string;
};

const STORAGE_KEY = "user";

// Check if we are in the browser (Next.js safety)
function isBrowser() {
  return typeof window !== "undefined";
}

export function getCurrentUser(): AuthUser | null {
  if (!isBrowser()) return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function setCurrentUser(user: AuthUser) {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function clearCurrentUser() {
  if (!isBrowser()) return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export function isLoggedIn(): boolean {
  return getCurrentUser() !== null;
}
