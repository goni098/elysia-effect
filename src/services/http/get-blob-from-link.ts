import axios from "axios";

export const getBlobFromLink = (link: string): Promise<Buffer> =>
  axios(link, {
    responseType: "arraybuffer"
  }).then(({ data }) => data);
