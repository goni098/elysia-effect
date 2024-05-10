import type { AxiosRequestConfig } from "axios";
import axios from "axios";

import { VERIFF_CALLBACK_URL } from "@root/shared/env";

import { veriffConfig } from "./config";

type CreateKycVeriffSessionResponse = {
  status: string;
  verification: {
    id: string;
    url: string;
    host: string;
    status: string;
    sessionToken: string;
  };
};

export const createKycVeriffSession =
  async (): Promise<CreateKycVeriffSessionResponse> => {
    try {
      const createKycVeriffSessionQuery: AxiosRequestConfig = {
        method: "post",
        baseURL: veriffConfig.host,
        url: `${veriffConfig.host}/v1/sessions`,
        headers: veriffConfig.header,
        data: {
          verification: {
            callback: VERIFF_CALLBACK_URL
          }
        },
        validateStatus: status => status === 201
      };

      const response = await axios.request(createKycVeriffSessionQuery);
      const data: CreateKycVeriffSessionResponse = response.data;
      return data;
    } catch (error) {
      throw error;
    }
  };
