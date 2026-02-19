import { Box } from "@mui/material";
import type { BoxProps } from "@mui/material";

import sxyImage from "@/assets/icons/shenxunyu.jpg";

const SxyIcon = (props: BoxProps) => {
  return (
    <Box
      component="img"
      src={sxyImage}
      alt="神荀彧"
      sx={{
        width: 60,
        height: 60,
        borderRadius: "50%",
        objectFit: "cover",
        ...props.sx,
      }}
      {...props}
    />
  );
};

export default SxyIcon;
