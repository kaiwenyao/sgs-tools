import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import { Box, Chip, Paper, Stack, Typography } from "@mui/material";

import { IconBadge, SectionCard } from "@/components";

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
    <>
      <SectionCard
        icon={<InfoOutlinedIcon color="primary" />}
        title="关于本工具"
        subtitle="这是一个面向三国杀对局辅助的轻量工具集，目标是让常用判定更快、更直观。当前包含神荀彧与李傕相关工具，后续会继续新增。"
      >
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          <Chip label="React + MUI" size="small" color="primary" variant="outlined" />
          <Chip label="移动端优先" size="small" color="primary" variant="outlined" />
          <Chip label="持续维护中" size="small" />
        </Stack>
      </SectionCard>

      {featureList.map((feature) => (
        <Paper key={feature.title} sx={{ p: 1.5 }}>
          <Stack direction="row" spacing={1} alignItems="flex-start">
            <IconBadge size={32}>{feature.icon}</IconBadge>
            <Box>
              <Typography fontWeight={700}>{feature.title}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {feature.description}
              </Typography>
            </Box>
          </Stack>
        </Paper>
      ))}
    </>
  );
};

export default About;
