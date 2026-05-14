// app/services/auth/authStorage.ts

export interface AuthUser {
  phone: string;
}

const USER_KEY = "solarina_user";

export function saveUser(user: AuthUser) {
  if (typeof window === "undefined") return;

  localStorage.setItem(USER_KEY, JSON.stringify(user));

  // ✅ Notify app that auth changed
  window.dispatchEvent(new Event("authChanged"));
}

export function getUser(): AuthUser | null {
  if (typeof window === "undefined") return null;

  const data = localStorage.getItem(USER_KEY);
  if (!data) return null;

  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function removeUser() {
  if (typeof window === "undefined") return;

  localStorage.removeItem(USER_KEY);

  // ✅ Notify app that auth changed
  window.dispatchEvent(new Event("authChanged"));
}

export function isLoggedIn() {
  return !!getUser();
}
