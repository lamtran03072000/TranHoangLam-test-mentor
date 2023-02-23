import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import { RootState } from "../redux/configStore";

type Props = {};

export default function TeamPlateHome({}: Props) {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state: RootState) => state.authSlice);
  useEffect(() => {
    if (!userInfo) {
      navigate("/user/login");
    }
  });
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
}
