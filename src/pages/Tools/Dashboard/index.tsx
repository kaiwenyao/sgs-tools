import {
  Box,
  ButtonBase,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { useNavigate } from "react-router-dom";

import { SxyIcon, LjIcon } from "@/components";

const toolsList = [
  {
    id: "sxy",
    name: "神荀彧",
    description: "奇兵 / 正兵快速决策",
    brief: "按场面选锦囊后，一键做战术判断。",
    tag: "对局中高频",
    icon: <SxyIcon sx={{ width: 64, height: 64, borderRadius: "50%" }} />,
    route: "sxy",
  },
  {
    id: "lj",
    name: "李傕",
    description: "概率加权随机判定",
    brief: "输入三段概率后执行单次随机结果。",
    tag: "概率工具",
    icon: <LjIcon sx={{ width: 64, height: 64, borderRadius: "50%" }} />,
    route: "lj",
  },
];

const ToolsIndex = () => {
  const navigate = useNavigate();

  return (
    <Stack spacing={1.2}>
      <Paper sx={{ borderRadius: 2, p: 1.4 }}>
        <Typography variant="h6">工具列表</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.3 }}>
          选择一个工具，快速进入对应功能。
        </Typography>
      </Paper>

      {toolsList.map((tool) => (
        <Paper
          key={tool.id}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            bgcolor: "rgba(255,255,255,0.98)",
          }}
        >
          <ButtonBase
            className="tap-direct"
            onClick={() => {
              void navigate(tool.route);
            }}
            sx={{
              display: "block",
              width: "100%",
              textAlign: "left",
              p: 1.4,
              cursor: "pointer",
              transition: "background-color 0.18s ease, box-shadow 0.18s ease",
              "&:hover": {
                backgroundColor: "rgba(15,118,110,0.04)",
                boxShadow: "0 10px 22px rgba(15,23,42,0.12)",
              },
              "&:active": {
                backgroundColor: "rgba(15,118,110,0.08)",
              },
              "&:focus-visible": {
                outline: "2px solid #0F766E",
                outlineOffset: "-2px",
              },
            }}
          >
            <Stack spacing={1.1}>
              <Stack direction="row" spacing={1.2} alignItems="center">
                <Box
                  sx={{
                    width: 74,
                    height: 74,
                    borderRadius: "50%",
                    border: "1px solid #D9E2E8",
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  {tool.icon}
                </Box>

                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography variant="h6" sx={{ fontSize: "1.22rem", lineHeight: 1.2 }}>
                    {tool.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mt: 0.35 }}>
                    {tool.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.2 }}>
                    {tool.brief}
                  </Typography>
                </Box>

                <ChevronRightRoundedIcon sx={{ color: "primary.main", fontSize: 24 }} />
              </Stack>

              <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1}>
                <Chip
                  size="small"
                  label={tool.tag}
                  sx={{
                    color: "primary.dark",
                    backgroundColor: "rgba(15,118,110,0.1)",
                    border: "1px solid rgba(15,118,110,0.2)",
                  }}
                />
                <Typography variant="body2" color="primary.main" fontWeight={700}>
                  点击进入
                </Typography>
              </Stack>
            </Stack>
          </ButtonBase>
        </Paper>
      ))}

      <Paper sx={{ borderRadius: 2, p: 1.2 }}>
        <Typography variant="body2" color="text.secondary">
          新增工具时，只需在 `toolsList` 里追加一项即可自动渲染。
        </Typography>
      </Paper>
    </Stack>
  );
};

export default ToolsIndex;
