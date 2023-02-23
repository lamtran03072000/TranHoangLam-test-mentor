import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Routers } from "./routers/Router";
import TeamPlateHome from "./templates/TeamPlateHome";
import Login from "./page/Login/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/user/login" />} />
        <Route path="/user/login" element={<Login />} />
        <Route element={<TeamPlateHome />}>
          {Routers.page.map((r, i) => (
            <Route key={i} path={r.path} element={r.element} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
