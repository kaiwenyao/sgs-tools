import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Fade,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const getRandomPercent = () => Math.random() * 100;
const resultLabels = ["羊袭", "狗袭", "狼袭"] as const;

type ResultKey = "partA" | "partB" | "partC";
type WeightState = Record<ResultKey, string>;

const presets: Array<{ label: string; values: WeightState }> = [
  { label: "均衡", values: { partA: "34", partB: "33", partC: "33" } },
  { label: "稳健", values: { partA: "50", partB: "30", partC: "20" } },
  { label: "激进", values: { partA: "20", partB: "20", partC: "60" } },
];

const parseWeight = (value: string) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return 0;
  }

  return Math.min(parsed, 100);
};

const Lijue = () => {
  const [values, setValues] = useState<WeightState>({
    partA: "",
    partB: "",
    partC: "",
  });
  const [result, setResult] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const numA = parseWeight(values.partA);
  const numB = parseWeight(values.partB);
  const numC = parseWeight(values.partC);

  const currentSum = numA + numB + numC;
  const isAllFilled = values.partA !== "" && values.partB !== "" && values.partC !== "";
  const isValid = isAllFilled && currentSum === 100;
  const diff = 100 - currentSum;

  const resultMeta = useMemo(
    () => [
      { label: "羊袭", value: numA, color: "#0F766E" },
      { label: "狗袭", value: numB, color: "#B45309" },
      { label: "狼袭", value: numC, color: "#64748B" },
    ],
    [numA, numB, numC]
  );

  const handleGenerate = () => {
    const randomVal = getRandomPercent();

    let finalResult;
    if (randomVal < numA) {
      finalResult = 0;
    } else if (randomVal < numA + numB) {
      finalResult = 1;
    } else {
      finalResult = 2;
    }

    setResult(resultLabels[finalResult]);
    setVisible(true);
  };

  const handleChange = (key: ResultKey, event: ChangeEvent<HTMLInputElement>) => {
    const next = event.target.value;

    if (next === "") {
      setValues((prev) => ({ ...prev, [key]: "" }));
      return;
    }

    if (!/^(\d{1,3})(\.\d{0,2})?$/.test(next)) {
      return;
    }

    setValues((prev) => ({ ...prev, [key]: next }));
  };

  useEffect(() => {
    if (!visible) {
      return;
    }

    const timer = setTimeout(() => {
      setVisible(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, [visible]);

  return (
    <Stack spacing={1.2}>
      <Paper sx={{ borderRadius: 2, p: 1.4 }}>
        <Typography variant="h6">李傕概率判定</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.4 }}>
          输入三个结果概率（总和需为 100），再执行随机判定。
        </Typography>

        <Stack direction="row" spacing={0.8} useFlexGap flexWrap="wrap" sx={{ mt: 1 }}>
          {presets.map((item) => (
            <Button
              key={item.label}
              size="small"
              variant="outlined"
              color="secondary"
              onClick={() => setValues(item.values)}
              sx={{ minHeight: 34 }}
            >
              {item.label}
            </Button>
          ))}
          <Button
            size="small"
            variant="text"
            color="secondary"
            onClick={() => setValues({ partA: "", partB: "", partC: "" })}
            sx={{ minHeight: 34 }}
          >
            清空
          </Button>
        </Stack>
      </Paper>

      <Paper sx={{ borderRadius: 2, p: 1.3 }}>
        <Stack spacing={1.2}>
          <TextField
            label="0 伤害 - 羊袭 (%)"
            type="number"
            value={values.partA}
            onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange("partA", event)}
            error={currentSum > 100}
            inputProps={{ min: 0, max: 100, inputMode: "decimal" }}
          />

          <TextField
            label="1 伤害 - 狗袭 (%)"
            type="number"
            value={values.partB}
            onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange("partB", event)}
            error={currentSum > 100}
            inputProps={{ min: 0, max: 100, inputMode: "decimal" }}
          />

          <TextField
            label="2 伤害 - 狼袭 (%)"
            type="number"
            value={values.partC}
            onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange("partC", event)}
            error={currentSum > 100}
            inputProps={{ min: 0, max: 100, inputMode: "decimal" }}
          />

          {isValid ? (
            <Alert severity="success">总和为 100%，可以开始判定。</Alert>
          ) : (
            <Alert severity={currentSum > 100 ? "error" : "warning"}>
              当前总和: <strong>{currentSum}%</strong>
              {!isAllFilled && "（请先填完三个输入项）"}
              {isAllFilled && currentSum < 100 && `（还差 ${diff}%）`}
              {isAllFilled && currentSum > 100 && `（超出 ${Math.abs(diff)}%）`}
            </Alert>
          )}

          <Stack spacing={0.6}>
            <Typography variant="caption" color="text.secondary">
              概率分布
            </Typography>

            <Box
              role="img"
              aria-label="当前三段概率分布"
              sx={{
                height: 14,
                borderRadius: 999,
                overflow: "hidden",
                display: "flex",
                border: "1px solid #D6DEE5",
                backgroundColor: "#FFFFFF",
              }}
            >
              {resultMeta.map((item) => (
                <Box
                  key={item.label}
                  sx={{
                    width: `${item.value}%`,
                    minWidth: item.value > 0 ? 6 : 0,
                    backgroundColor: item.color,
                  }}
                />
              ))}
            </Box>

            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
              {resultMeta.map((item) => (
                <Chip key={item.label} size="small" label={`${item.label} ${item.value}%`} />
              ))}
            </Stack>
          </Stack>

          <Button
            variant="contained"
            fullWidth
            disabled={!isValid}
            onClick={handleGenerate}
            sx={{
              mt: 0.2,
            }}
          >
            执行随机判定
          </Button>
        </Stack>
      </Paper>

      <Fade in={visible} timeout={250}>
        <Paper
          sx={{
            minHeight: 116,
            p: 1.2,
            borderRadius: 2,
            display: "grid",
            placeItems: "center",
            borderColor: "rgba(15,118,110,0.3)",
            backgroundColor: "rgba(15,118,110,0.05)",
          }}
        >
          <Stack spacing={0.5} alignItems="center">
            <Chip label="本次结果" color="primary" variant="outlined" size="small" />
            <Typography
              className="font-jinmeifanglishu"
              sx={{
                fontSize: "2.3rem",
                lineHeight: 1.1,
                color: "primary.dark",
              }}
            >
              {result}
            </Typography>
          </Stack>
        </Paper>
      </Fade>
    </Stack>
  );
};

export default Lijue;
