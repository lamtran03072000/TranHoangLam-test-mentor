import Login from "../page/Login/Login";
import Home from "../page/Home/Home";
import CreateProject from "../page/CreateProject/CreateProject";
import UpdateProject from "../page/UpdateProject/UpdateProject";
import CreateTask from "../page/CreateTask/CreateTask";
import UpdateTask from "../page/UpdateTask/UpdateTask";
export const Routers = {
  authPage: [
    {
      path: "/user/login",
      element: <Login />,
    },
  ],
  page: [
    {
      path: "/home",
      element: <Home />,
    },
    { path: "/createProject", element: <CreateProject /> },
    { path: "/updateProject/:projectId", element: <UpdateProject /> },
    {
      path: "/createTask",
      element: <CreateTask />,
    },
    {
      path: "/updateTask/:taskId",
      element: <UpdateTask />,
    },
  ],
};
