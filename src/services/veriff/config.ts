import { VERIFF_API_KEY, VERIFF_HOST } from "@root/shared/env";

export const veriffConfig = {
  host: VERIFF_HOST,
  header: {
    "X-AUTH-CLIENT": VERIFF_API_KEY
  }
};
