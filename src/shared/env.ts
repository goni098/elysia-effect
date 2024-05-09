import { readConfigOrDie } from "@root/helpers/read-config";

export const JWT_ACCESS_SECRET = readConfigOrDie("JWT_ACCESS_SECRET");

export const JWT_RENEW_SECRET = readConfigOrDie("JWT_RENEW_SECRET");
