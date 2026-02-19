import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

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
          pb: "calc(84px + env(safe-area-inset-bottom))",
        }}
      >
        <Paper
          sx={{
            borderRadius: 2,
            p: 1.6,
            background:
              "linear-gradient(135deg, rgba(15,118,110,0.08), rgba(148,163,184,0.06))",
            borderColor: "rgba(148,163,184,0.55)",
          }}
        >
          <Stack spacing={0.8}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1}>
              <Typography
                variant="overline"
                sx={{ color: "primary.main", fontWeight: 700, letterSpacing: "0.18em" }}
              >
                SGS TOOLS
              </Typography>
              <Chip label="移动端" size="small" color="primary" variant="outlined" />
            </Stack>

            <Typography variant="h5" sx={{ color: "text.primary" }}>
              三国杀小工具集
            </Typography>

            <Typography variant="body2" color="text.secondary">
              轻量、快速、可直接点击使用的对局辅助工具。
            </Typography>
          </Stack>
        </Paper>

        <Box component="main" sx={{ mt: 1.4 }}>
          <Outlet />
        </Box>
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
              sx={{ px: 0.3 }}
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
