import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import Layout from "@/pages/Layout";
import ToolsIndex from "@/pages/Tools";
import About from "@/pages/About";
import Sxy from "@/pages/Tools/sxy";
import Lijue from "@/pages/Tools/lj";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        // 默认访问 / 时，重定向到 /tools
        index: true,
        element: <Navigate to="/tools" replace />,
      },
      {
        path: "tools",
        element: <Outlet />,
        children: [
          {
            // 当路径是 /tools 时，渲染原来的九宫格组件
            index: true,
            element: <ToolsIndex />, // 把你原来的 Tools 组件改名为 ToolsIndex
          },
          {
            path: "sxy",
            element: <Sxy />,
          },
          {
            path: "lj",
            element: <Lijue />
          }
        ],
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);
export { router };
