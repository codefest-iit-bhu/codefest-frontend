import { memo, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = memo(({}) => {
  const location = useLocation();
  const { pathname } = location;
  useEffect(() => {}, [pathname]);

  return <Outlet />;
});

export default Layout;
