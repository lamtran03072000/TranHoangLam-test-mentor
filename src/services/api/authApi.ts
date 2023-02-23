import { UserState } from "../../page/Login/Login";
import { https } from "../urlConfig";

export const authApi = {
  postLogin: (user: UserState) => {
    const uri = "/api/Users/signin";
    return https.post(uri, user);
  },
};
