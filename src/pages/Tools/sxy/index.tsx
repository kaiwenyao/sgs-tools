import { useMemo, useState } from "react";
import { Button, Chip, Grid, Stack, Typography } from "@mui/material";

import { SectionCard } from "@/components";
import { brandAlpha, inkShadow, typeScale } from "@/theme";

const buttonTransition =
  "background-color 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease";
const activeShadow = inkShadow(0.12, 6, 14);

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
    <>
      <SectionCard
        title="神荀彧判定"
        subtitle="先勾选场上锦囊，再选择奇兵或正兵。"
        action={
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
        }
      >
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          <Chip
            label={`已选锦囊 ${selectedScrolls.length}`}
            size="small"
            color="primary"
            variant="outlined"
          />
          <Chip label={`当前应对：${selectedOptionLabel}`} size="small" />
        </Stack>
      </SectionCard>

      <SectionCard
        title="锦囊列表"
        titleVariant="subtitle1"
        action={<Chip label={`${scrollList.length} 项`} size="small" />}
      >
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
                    fontSize: typeScale.body,
                    color: isActive ? "primary.dark" : "text.primary",
                    border: "1px solid",
                    borderColor: isActive ? "primary.main" : "divider",
                    backgroundColor: isActive ? brandAlpha(0.12) : "#FFFFFF",
                    transition: buttonTransition,
                    boxShadow: isActive ? activeShadow : "none",
                  }}
                >
                  {item.name}
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </SectionCard>

      <SectionCard title="应对方式" titleVariant="subtitle1">
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
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.25,
                    transition: buttonTransition,
                    boxShadow: isActive ? activeShadow : "none",
                  }}
                >
                  <Typography className="font-jinmeifanglishu" variant="large">
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
      </SectionCard>

      <SectionCard>
        <Typography variant="body2" color="text.secondary">
          已选锦囊：{selectedScrollText}
        </Typography>
      </SectionCard>
    </>
  );
};

export default Sxy;
