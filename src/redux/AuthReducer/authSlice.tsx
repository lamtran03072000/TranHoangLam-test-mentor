import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";
import { type } from "os";
import { UserState } from "../../page/Login/Login";
import { authApi } from "../../services/api/authApi";
import { settings, USER_INFO } from "../../services/urlConfig";
import { DispatchType } from "../configStore";

export type UserLoginInfo = {
  id: number;
  email: string;
  avatar: string;
  phoneNumber: string;
  name: string;
  accessToken: string;
};

export type AuthState = {
  userInfo: UserLoginInfo | null;
};

const initialState: AuthState = {
  userInfo: settings.getStorageJson(USER_INFO)
    ? settings.getStorageJson(USER_INFO)
    : null,
};

const AuthSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUserInfo: (state: AuthState, action: PayloadAction<UserLoginInfo>) => {
      state.userInfo = action.payload;
      settings.setStorageJson(USER_INFO, action.payload);
    },
    logOutUser: (state: AuthState, action: PayloadAction<null>) => {
      state.userInfo = null;
      settings.clearStorage(USER_INFO);
    },
  },
});

export const { setUserInfo, logOutUser } = AuthSlice.actions;

export const postLoginAsync = (user: UserState) => {
  return async (dispatch: DispatchType) => {
    try {
      const res = await authApi.postLogin(user);
      const userInfo = res.data.content;
      const action: PayloadAction<UserLoginInfo> = setUserInfo(userInfo);
      dispatch(action);
      message.success("Login is success");
    } catch (error: any) {
      message.error(error.message);
    }
  };
};
export default AuthSlice.reducer;
