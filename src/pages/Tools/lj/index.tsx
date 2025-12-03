import { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Stack,
  Alert,
  Typography,
  Box,
  Fade,
} from "@mui/material";
const Lijue = () => {
  // 1. 定义状态：这里用一个对象存储三个输入框的值
  // 初始值设为字符串 ""，方便处理空输入的情况
  const [values, setValues] = useState({
    partA: "",
    partB: "",
    partC: "",
  });
  const [result, setResult] = useState<string | null>(null);
  const handleGenerate = () => {
    // 1. 获取当前的权重值 (转为数字)
    const weightA = Number(values.partA);
    const weightB = Number(values.partB);
    // weightC 其实不需要参与计算，只要前两个没中，剩下的就是 C

    // 2. 生成一个 0 - 100 之间的随机数
    // Math.random() 生成 0-1 的小数，乘以 100 变成百分比位置

    const randomVal = Math.random() * 100;

    // 3. 判断落在哪个区间
    let finalResult;

    if (randomVal < weightA) {
      // 落在 0 到 A 之间 -> 选中 A (对应数字 0)
      finalResult = 0;
    } else if (randomVal < weightA + weightB) {
      // 落在 A 到 A+B 之间 -> 选中 B (对应数字 1)
      finalResult = 1;
    } else {
      // 剩下的情况 -> 选中 C (对应数字 2)
      finalResult = 2;
    }

    // 4. 更新状态显示结果
    // 为了让你看清楚，我把生成的随机数也打印出来
    // console.log(`随机数: ${randomVal.toFixed(2)}, 结果: ${finalResult}`);
    setResult(
      // `随机选中了: ${finalResult} (对应输入框 ${["A", "B", "C"][finalResult]})`
      `${["🐑羊袭！", "🐕狗袭！", "🐺狼袭！"][finalResult]}`
    );
    setVisible(true);
  };
  // 2. 处理输入改变
  const handleChange = (key: string, newValue: string) => {
    // 简单的正则验证：只允许输入数字 (可选：允许小数)
    // 如果你不介意 e 符号等，可以直接用 type="number" 配合
    setValues((prev) => ({
      ...prev,
      [key]: newValue,
    }));
  };

  // 3. 【核心逻辑】实时计算总和 (Derived State)
  // Number(val) 会把空字符串转为 0，这正好符合我们的计算需求
  const numA = Number(values.partA);
  const numB = Number(values.partB);
  const numC = Number(values.partC);

  const currentSum = numA + numB + numC;
  const isValid = currentSum === 100;

  // 计算差值
  const diff = 100 - currentSum;

  // 1. 控制显示/隐藏的状态
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // 只有当 visible 变成 true 时，才启动定时器
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false); // 2秒后隐藏
      }, 2000);

      // 清理函数：防止用户狂点按钮导致定时器冲突
      return () => clearTimeout(timer);
    }
  }, [visible]); // 依赖项改为 visible
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        随机伤害概率分布
      </Typography>

      <Stack spacing={3}>
        {/* 输入框 A */}
        <TextField
          label="0伤害-羊袭(%)"
          type="number" // 限制数字输入键盘
          value={values.partA}
          onChange={(e) => handleChange("partA", e.target.value)}
          error={currentSum > 100}
        />

        {/* 输入框 B */}
        <TextField
          label="1伤害-狗袭(%)"
          type="number"
          value={values.partB}
          onChange={(e) => handleChange("partB", e.target.value)}
          error={currentSum > 100}
        />

        {/* 输入框 C */}
        <TextField
          label="2伤害-狼袭(%)"
          type="number"
          value={values.partC}
          onChange={(e) => handleChange("partC", e.target.value)}
          error={currentSum > 100}
        />

        {/* 4. 实时提示反馈区域 */}
        {isValid ? (
          // 情况 1: 等于 100 (成功)
          <Alert severity="success">完美！总和等于 100%。</Alert>
        ) : (
          // 情况 2: 不等于 100 (警告/错误)
          <Alert severity={currentSum > 100 ? "error" : "warning"}>
            当前总和: <strong>{currentSum}%</strong>
            {currentSum < 100 && ` (还差 ${diff}%)`}
            {currentSum > 100 && ` (已超出 ${Math.abs(diff)}%)`}
          </Alert>
        )}
        <Button
          variant="contained"
          disabled={!isValid}
          onClick={() => handleGenerate()}
        >
          狼袭！
        </Button>
        <Fade in={visible} timeout={500}>
          <Typography
            align="center"
            fontSize={"16vw"}
            sx={{
              // 可选：为了防止文字消失后页面布局跳动
              // 可以给它设一个固定高度，或者保持它占位
              // 如果不介意消失后下方内容上移，可以不写这个
              minHeight: "20vw",
            }}
          >
            {result}
          </Typography>
        </Fade>
      </Stack>
    </Box>
  );
};

export default Lijue;
