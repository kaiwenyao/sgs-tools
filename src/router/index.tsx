/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Box, Chip, CircularProgress, Paper, Stack, Typography } from "@mui/material";

// Lazy load components
const Layout = lazy(() => import("@/pages/Layout"));
const ToolsIndex = lazy(() => import("@/pages/Tools/Dashboard"));
const About = lazy(() => import("@/pages/About"));
const Sxy = lazy(() => import("@/pages/Tools/sxy"));
const Lijue = lazy(() => import("@/pages/Tools/lj"));

// Loading fallback component
const Loading = () => (
  <Box
    sx={{
      minHeight: "100vh",
      display: "grid",
      placeItems: "center",
      textAlign: "center",
      px: 2,
    }}
  >
        <Paper
      sx={{
        px: 2,
        py: 1.5,
        minWidth: 210,
      }}
    >
      <Stack spacing={1} alignItems="center">
        <CircularProgress size={32} />
        <Typography fontWeight={700} color="text.primary">
          页面加载中
        </Typography>
        <Typography variant="body2" color="text.secondary">
          正在准备工具界面...
        </Typography>
        <Chip size="small" label="请稍候" color="primary" variant="outlined" />
      </Stack>
    </Paper>
  </Box>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <Layout />
      </Suspense>
    ),
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
