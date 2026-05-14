export interface AuthUser {
  phone: string;
}

const USER_KEY = "solarina_user";

export function saveUser(user: AuthUser) {
  if (typeof window === "undefined") return;

  localStorage.setItem(
    USER_KEY,
    JSON.stringify(user)
  );

  window.dispatchEvent(
    new Event("authChanged")
  );
}

export function getUser(): AuthUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const data = localStorage.getItem(USER_KEY);

    if (!data) return null;

    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function removeUser() {
  if (typeof window === "undefined") return;

  localStorage.removeItem(USER_KEY);

  window.dispatchEvent(
    new Event("authChanged")
  );
}

export function isLoggedIn() {
  return !!getUser();
}
