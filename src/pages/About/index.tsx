import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import {
  Box,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

const featureList = [
  {
    icon: <SpeedOutlinedIcon fontSize="small" />,
    title: "快速操作",
    description: "针对高频决策场景做简化，打开即可使用。",
  },
  {
    icon: <SecurityOutlinedIcon fontSize="small" />,
    title: "纯本地逻辑",
    description: "判定逻辑在前端执行，不依赖外部服务。",
  },
  {
    icon: <AutoAwesomeIcon fontSize="small" />,
    title: "持续扩展",
    description: "后续会补充更多武将与机制相关工具。",
  },
];

const About = () => {
  return (
    <Stack spacing={1.2}>
      <Paper sx={{ borderRadius: 2, p: 1.4 }}>
        <Stack direction="row" spacing={1} alignItems="flex-start">
          <InfoOutlinedIcon color="primary" sx={{ mt: 0.1 }} />
          <Box>
            <Typography variant="h6">关于本工具</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.45, lineHeight: 1.7 }}>
              这是一个面向三国杀对局辅助的轻量工具集，目标是让常用判定更快、更直观。
              当前包含神荀彧与李傕相关工具，后续会继续新增。
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={0.8} useFlexGap flexWrap="wrap" sx={{ mt: 1 }}>
          <Chip label="React + MUI" size="small" color="primary" variant="outlined" />
          <Chip label="移动端优先" size="small" color="primary" variant="outlined" />
          <Chip label="持续维护中" size="small" />
        </Stack>
      </Paper>

      {featureList.map((feature) => (
        <Paper key={feature.title} sx={{ borderRadius: 2, p: 1.3 }}>
          <Stack direction="row" spacing={1.1} alignItems="flex-start">
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1.8,
                color: "primary.main",
                backgroundColor: "rgba(15,118,110,0.1)",
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
              }}
            >
              {feature.icon}
            </Box>
            <Box>
              <Typography fontWeight={700}>{feature.title}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.3 }}>
                {feature.description}
              </Typography>
            </Box>
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
};

export default About;
