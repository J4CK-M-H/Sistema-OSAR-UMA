import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Drawer } from "../components/Drawer";
import { useState } from "react";

export const LayoutPrivate = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <Navbar setVisible={setVisible} />
      <Drawer visible={visible} setVisible={setVisible} />
      <div className="p-4 bg-[#EEF0E5]">
        <div className="pt-20">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
