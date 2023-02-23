import React, { useState } from "react";
import { Button, Drawer } from "antd";
import { Routers } from "../../routers/Router";
import { NavLink } from "react-router-dom";
type Props = {};

export default function Header({}: Props) {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const renderRoute = () => {
    return Routers.page.map((r) => (
      <NavLink
        className={
          "w-full block rounded bg-gray-200 px-3 py-2 hover:text-white"
        }
        key={r.path}
        to={r.path}
      >
        {r.path}
      </NavLink>
    ));
  };
  return (
    <main className="flex justify-between">
      <div>
        <button
          className="bg-blue-500 text-white px-3 py-2 rounded"
          onClick={showDrawer}
        >
          OpenRoute
        </button>
        <Drawer placement="left" onClose={onClose} open={open} width={300}>
          <div className="space-y-2">{renderRoute()}</div>
        </Drawer>
      </div>
    </main>
  );
}
