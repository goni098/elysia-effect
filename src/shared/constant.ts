export const ENDPOINT = {
  AUTH: {
    PREFIX: "auth",
    SIGN_IN_GOOGLE: "/sign-in-google",
    SIGN_IN: "/sign-in"
  },
  USER: {
    PREFIX: "users",
    ME: "/me"
  },
  THEME: {
    PREFIX: "themes",
    GET_THEMES: "/",
    GET_THEME: "/:theme_id",
    CREATE_THEME: "/creating",
    LIST_THEME: "/listing",
    BUY_THEME: "/buying",
    BUY_LICENSE: "/license-buying",
    UPLOAD_THEME: "/upload",
    DOWNLOAD: "/download"
  }
} as const;
