export const DB_NAME = "chacha-chatore-DB";

export const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
  secure: process.env.NODE_ENV !== "development",
};

export const USER_ROLES_ENUM = {
  USER: "USER",
  ADMIN: "ADMIN",
};

export const AVAILABLE_USER_ROLES = Object.values(USER_ROLES_ENUM);
