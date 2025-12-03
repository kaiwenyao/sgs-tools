import { Outlet, useNavigate, useLocation } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AppsIcon from "@mui/icons-material/Apps"; // 对应“常用工具”
import PersonIcon from "@mui/icons-material/Person"; // 对应“关于”
import "./index.scss";
const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // 获取当前路径，确保刷新页面后高亮状态正确
  const pathname = location.pathname;
  return (
    <div className="layout-container">
      <div className="layout-content">
        <Outlet />
      </div>
      {/* 底部导航栏 */}
      <div className="layout-tabbar">
        <BottomNavigation
          showLabels
          value={pathname} // 高亮当前路径对应的按钮
          onChange={(_, newValue) => {
            void navigate(newValue as string); // 切换路由
          }}
        >
          <BottomNavigationAction
            label="工具列表"
            value="/tools"
            icon={<AppsIcon />}
          />
          <BottomNavigationAction
            label="关于"
            value="/about"
            icon={<PersonIcon />}
          />
        </BottomNavigation>
      </div>
    </div>
  );
};

export default Layout;
