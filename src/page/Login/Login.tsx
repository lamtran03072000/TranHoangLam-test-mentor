import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DispatchType, RootState } from "../../redux/configStore";
import {
  FundOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { postLoginAsync } from "../../redux/AuthReducer/authSlice";
import { message } from "antd";
type Props = {};

export type UserState = {
  email: string;
  passWord: string;
};

export default function Login({}: Props) {
  const navigate = useNavigate();
  const dispatch: DispatchType = useDispatch();
  const [hiddenPass, setHiddenPass] = useState<boolean>(true);
  const [user, setUser] = useState<UserState>({
    email: "",
    passWord: "",
  });
  const { userInfo } = useSelector((state: RootState) => state.authSlice);

  useEffect(() => {
    if (userInfo) {
      navigate("/home");
    }
  });

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(user.email && user.passWord)) {
      message.error("password or email invalid");
      return;
    }
    dispatch(postLoginAsync(user));
  };
  const handleChangeHiddenPass = () => {
    setHiddenPass(!hiddenPass);
  };

  return (
    <main className="login">
      <div className="w-full h-full flex relative">
        <div className="login-left"></div>
        <div className="login-right">
          <img
            className="w-full h-full object-cover"
            src="https://img.freepik.com/free-vector/business-team-brainstorm-idea-lightbulb-from-jigsaw-working-team-collaboration-enterprise-cooperation-colleagues-mutual-assistance-concept-pinkish-coral-bluevector-isolated-illustration_335657-1651.jpg?size=626&ext=jpg&ga=GA1.2.613062224.1675389933"
            alt=""
          />
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="bg-white w-full h-full rounded-md shadow-2xl border px-10 py-14 space-y-12">
            <div className="space-y-4">
              <h1 className="login-title text-pink-600">CyberSoft Family</h1>
              <p className="text-sm space-x-2 text-pink-500">
                <FundOutlined className="font-bold text-3xl " />
                <span>Welcome to the land of dreams !!!</span>
              </p>
            </div>
            <div className="space-y-7">
              <div className="form-item">
                <label className="input">
                  <input
                    name="email"
                    value={user.email}
                    className="input__field"
                    type="text"
                    onChange={handleChangeValue}
                  />
                  <span className="input__label">Email</span>
                </label>
              </div>
              <div className="form-item">
                <label className="input">
                  <input
                    name="passWord"
                    value={user.passWord}
                    className="input__field"
                    type={hiddenPass ? "password" : "text"}
                    onChange={handleChangeValue}
                  />
                  <span className="input__label">Password</span>
                  <span
                    onClick={handleChangeHiddenPass}
                    className="absolute right-2 top-1 text-pink-500 font-bold text-lg duration-150 cursor-pointer"
                  >
                    {hiddenPass ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                  </span>
                </label>
              </div>
            </div>
            <button className="bg-pink-500 block w-full text-white px-4 py-2 rounded-xl hover:bg-pink-600 duration-150 cursor-pointer">
              Log In
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
