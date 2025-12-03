// src/components/SxyIcon.tsx
import { Box } from "@mui/material";
import type { BoxProps } from "@mui/material";

// 1. 引入图片文件
// 请根据你实际文件的相对位置调整路径
// 如果本文件在 src/components，图片在 src/assets/icons，则需回退两级：
import sxyImage from "@/assets/icons/shenxunyu.jpg";

const SxyIcon = (props: BoxProps) => {
  return (
    <Box
      component="img"
      src={sxyImage}
      alt="Sxy Icon"
      // 2. 这里的 sx 定义了默认样式
      sx={{
        width: "25vw", // 默认宽度
        height: "25vw", // 默认高度
        borderRadius: 2, // 默认圆角 (2 = 8px)
        objectFit: "cover", // 防止图片被拉伸变形

        // 3. 这是一个技巧：合并传入的 sx
        // 这样你在使用时，如果想临时改大小，可以直接传 sx 覆盖这里
        ...props.sx,
      }}
      // 将其余属性传递给 Box (比如 onClick, className 等)
      {...props}
    />
  );
};

export default SxyIcon;
