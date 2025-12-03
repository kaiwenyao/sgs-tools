import { Grid, Paper, Typography, Box, Stack } from "@mui/material";

import { SxyIcon, LjIcon } from "@/components";
import { useNavigate } from "react-router-dom";
// 1. 定义你的工具列表数据
// 这样未来你要加功能，只需要在这个数组里加一行，界面自动生成，不需要改布局代码
const toolsList = [
  {
    id: 1,
    name: "神荀彧",
    // 2. 直接像使用标签一样使用它
    icon: <SxyIcon />,
    route: "sxy",
  },
  {
    id: 2,
    name: "李傕",
    icon: <LjIcon />,
    route: "lj",
  },
  // 未来可以在这里继续添加...
];
const ToolsIndex = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ padding: 2 }}>
      {/* Grid container: 网格容器
         spacing={2}: 每个格子之间的间距
      */}
      <Grid container spacing={2}>
        {toolsList.map((tool) => (
          <Grid size={4} key={tool.id}>
            <Paper
              elevation={2} // 阴影深度，0-24，值越大越立体
              sx={{
                padding: 1,
                textAlign: "center",
                cursor: "pointer",
                // 点击时的反馈效果（可选）
                "&:active": { backgroundColor: "#f5f5f5" },
              }}
              onClick={() => {
                console.log(`点击了 ${tool.name}，准备跳转到 ${tool.route}`);
                // 这里后面可以接 navigate(tool.route)
                navigate(tool.route);
              }}
            >
              <Stack alignItems="center" spacing={0}>
                <Box
                  sx={{
                    color: "primary.main",
                  }}
                >
                  {tool.icon}
                </Box>
                <Typography variant="caption" display="block">
                  {tool.name}
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ToolsIndex;
