import axios from "axios";

type UserData = {
  sub: string; // google id
  email: string;
};

export const getGoogleUserInfo = async (
  accessToken: string
): Promise<UserData> => {
  const response = await axios.get(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`
  );
  return response.data;
};
