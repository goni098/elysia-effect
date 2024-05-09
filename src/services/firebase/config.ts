import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

import { readConfigOrDie } from "@root/helpers/read-config";

const apiKey = readConfigOrDie("FIREBASE_API_KEY");

const authDomain = readConfigOrDie("FIREBASE_AUTH_DOMAIN");

const projectId = readConfigOrDie("FIREBASE_PROJECT_ID");

const storageBucket = readConfigOrDie("FIREBASE_STORAGE_BUCKET");

const messagingSenderId = readConfigOrDie("FIREBASE_MESSAGING_SENDER_ID");

const appId = readConfigOrDie("FIREBASE_APP_ID");

const app = initializeApp({
  apiKey,
  appId,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId
});

export const firebaseStorage = getStorage(app);
