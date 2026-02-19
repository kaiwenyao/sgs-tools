import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

const scrollList = [
  { id: 1, name: "顺手牵羊" },
  { id: 2, name: "过河拆桥" },
  { id: 3, name: "五谷丰登" },
  { id: 4, name: "无中生有" },
  { id: 5, name: "决斗" },
  { id: 6, name: "南蛮入侵" },
  { id: 7, name: "万箭齐发" },
  { id: 8, name: "闪电" },
  { id: 9, name: "桃园结义" },
  { id: 10, name: "无懈可击" },
  { id: 11, name: "借刀杀人" },
  { id: 12, name: "乐不思蜀" },
  { id: 13, name: "兵粮寸断" },
  { id: 14, name: "铁索连环" },
  { id: 15, name: "火攻" },
];

const optionList = [
  { id: 1, name: "奇兵", description: "偏向先手压制" },
  { id: 2, name: "正兵", description: "偏向稳健应对" },
];

const Sxy = () => {
  const [selectedScrolls, setSelectedScrolls] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setSelectedScrolls((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedScrollText = useMemo(() => {
    if (selectedScrolls.length === 0) {
      return "当前未选择锦囊。";
    }

    return scrollList
      .filter((item) => selectedScrolls.includes(item.id))
      .map((item) => item.name)
      .join("、");
  }, [selectedScrolls]);

  const selectedOptionLabel = useMemo(() => {
    return optionList.find((item) => item.id === selectedOption)?.name ?? "未选择";
  }, [selectedOption]);

  return (
    <Stack spacing={1.2}>
      <Paper sx={{ borderRadius: 2, p: 1.4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1}>
          <Box>
            <Typography variant="h6">神荀彧判定</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.35 }}>
              先勾选场上锦囊，再选择奇兵或正兵。
            </Typography>
          </Box>
          <Button
            size="small"
            color="secondary"
            onClick={() => {
              setSelectedScrolls([]);
              setSelectedOption(null);
            }}
            disabled={selectedScrolls.length === 0 && selectedOption === null}
            sx={{ minHeight: 36 }}
          >
            清空
          </Button>
        </Stack>

        <Stack direction="row" spacing={0.8} useFlexGap flexWrap="wrap" sx={{ mt: 1 }}>
          <Chip label={`已选锦囊 ${selectedScrolls.length}`} size="small" color="primary" variant="outlined" />
          <Chip label={`当前应对：${selectedOptionLabel}`} size="small" />
        </Stack>
      </Paper>

      <Paper sx={{ borderRadius: 2, p: 1.3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
          <Typography variant="subtitle1">锦囊列表</Typography>
          <Chip label={`${scrollList.length} 项`} size="small" />
        </Stack>

        <Grid container spacing={1}>
          {scrollList.map((item) => {
            const isActive = selectedScrolls.includes(item.id);

            return (
              <Grid key={item.id} size={{ xs: 4 }}>
                <Button
                  className="font-jinmeifanglishu tap-direct"
                  fullWidth
                  aria-pressed={isActive}
                  onClick={() => handleToggle(item.id)}
                  sx={{
                    minHeight: 44,
                    borderRadius: 2,
                    fontSize: "0.98rem",
                    color: isActive ? "primary.dark" : "text.primary",
                    border: "1px solid",
                    borderColor: isActive ? "primary.main" : "#D6DEE5",
                    backgroundColor: isActive ? "rgba(15,118,110,0.12)" : "#FFFFFF",
                    transition:
                      "background-color 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease",
                    boxShadow: isActive ? "0 4px 10px rgba(15,23,42,0.12)" : "none",
                  }}
                >
                  {item.name}
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </Paper>

      <Paper sx={{ borderRadius: 2, p: 1.3 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          应对方式
        </Typography>

        <Grid container spacing={1}>
          {optionList.map((item) => {
            const isActive = item.id === selectedOption;

            return (
              <Grid key={item.id} size={6}>
                <Button
                  className="tap-direct"
                  fullWidth
                  aria-pressed={isActive}
                  onClick={() => setSelectedOption(item.id)}
                  variant={isActive ? "contained" : "outlined"}
                  sx={{
                    minHeight: 96,
                    borderRadius: 2.5,
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.2,
                    transition:
                      "background-color 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease",
                    boxShadow: isActive ? "0 6px 14px rgba(15,23,42,0.16)" : "none",
                  }}
                >
                  <Typography className="font-jinmeifanglishu" sx={{ fontSize: "1.7rem", lineHeight: 1 }}>
                    {item.name}
                  </Typography>
                  <Typography component="span" variant="caption" sx={{ opacity: 0.9 }}>
                    {item.description}
                  </Typography>
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </Paper>

      <Paper sx={{ borderRadius: 2, p: 1.2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65 }}>
          已选锦囊：{selectedScrollText}
        </Typography>
      </Paper>
    </Stack>
  );
};

export default Sxy;
