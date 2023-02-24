import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import Header from "../components/Header/Header";
import { DispatchType, RootState } from "../redux/configStore";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusSquareOutlined,
  HomeOutlined,
  PlusCircleOutlined,
  CloudUploadOutlined,
  UploadOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { logOutUser } from "../redux/AuthReducer/authSlice";

const { Header, Sider, Content } = Layout;
type Props = {};

export default function TeamPlateHome({}: Props) {
  const navigate = useNavigate();
  const dispatch: DispatchType = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.authSlice);
  useEffect(() => {
    if (!userInfo) {
      navigate("/user/login");
    }
  });
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const handleLogout = () => {
    dispatch(logOutUser(null));
  };
  return (
    <Layout className="w-screen h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <HomeOutlined />,
              label: <NavLink to={"/home"}>Home</NavLink>,
            },
            {
              key: "2",
              icon: <PlusCircleOutlined />,
              label: <NavLink to={"/createProject"}>Create Project</NavLink>,
            },
            {
              key: "3",
              icon: <PlusSquareOutlined />,
              label: <NavLink to={"/createTask"}>Create Task</NavLink>,
            },
            {
              key: "4",
              icon: <CloudUploadOutlined />,
              label: (
                <NavLink to={"/updateProject/11599"}>Update Project</NavLink>
              ),
            },
            {
              key: "5",
              icon: <UploadOutlined />,
              label: <NavLink to={"/updateTask/9142"}>Update Task</NavLink>,
            },
            {
              key: "6",
              icon: <LogoutOutlined />,
              label: (
                <NavLink onClick={handleLogout} to={"/user/login"}>
                  Log Out
                </NavLink>
              ),
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
