import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { Box, Stack } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { PageHeader } from "@/components";

const BOTTOM_NAV_CLEARANCE = 84;

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname.startsWith("/about") ? "/about" : "/tools";
  const canUsePortal = typeof document !== "undefined";

  return (
    <>
      <Box
        sx={{
          width: "100%",
          maxWidth: 430,
          minHeight: "100vh",
          mx: "auto",
          px: 1.5,
          pt: 1.5,
          pb: `calc(${BOTTOM_NAV_CLEARANCE}px + env(safe-area-inset-bottom))`,
        }}
      >
        <PageHeader
          title="三国杀小工具集"
          subtitle="轻量、快速、可直接点击使用的对局辅助工具。"
        />

        <Stack component="main" spacing={1} sx={{ mt: 1.5 }}>
          <Outlet />
        </Stack>
      </Box>

      {canUsePortal &&
        createPortal(
          <Box
            sx={{
              position: "fixed",
              left: "50%",
              transform: "translateX(-50%)",
              bottom: "calc(8px + env(safe-area-inset-bottom))",
              width: "min(430px, calc(100vw - 16px))",
              zIndex: 2200,
              px: 1,
            }}
          >
            <BottomNavigation
              showLabels
              value={pathname}
              onChange={(_, newValue) => {
                void navigate(newValue as string);
              }}
              sx={{ px: 0.5 }}
            >
              <BottomNavigationAction label="工具列表" value="/tools" icon={<AppsRoundedIcon />} />
              <BottomNavigationAction label="关于" value="/about" icon={<InfoOutlinedIcon />} />
            </BottomNavigation>
          </Box>,
          document.body
        )}
    </>
  );
};

export default Layout;
