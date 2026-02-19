import { Box } from "@mui/material";
import type { BoxProps } from "@mui/material";

import ljImage from "@/assets/icons/lijue.jpg";

const LjIcon = (props: BoxProps) => {
  return (
    <Box
      component="img"
      src={ljImage}
      alt="李傕"
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

export default LjIcon;
