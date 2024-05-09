import * as FirebaseStorage from "firebase/storage";
import { DateTime } from "luxon";

import { firebaseStorage } from "./config";

export const uploadFile = async (file: File) => {
  const filename = file.name.replace(/\s+/g, "");

  const time = DateTime.now().toMillis();

  const location = `themes/zip/${time}_${filename}`;

  const objRef = FirebaseStorage.ref(firebaseStorage, location);

  const buffer = await file.arrayBuffer();

  const response = await FirebaseStorage.uploadBytes(objRef, buffer);

  return FirebaseStorage.getDownloadURL(response.ref);
};
