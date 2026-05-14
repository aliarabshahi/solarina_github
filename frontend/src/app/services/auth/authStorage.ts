export const saveUser = (user: any) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  if (typeof window === "undefined") return null;

  const data = localStorage.getItem("user");

  return data ? JSON.parse(data) : null;
};

export const logout = () => {
  localStorage.removeItem("user");
};
