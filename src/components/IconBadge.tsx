import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";

import { brandAlpha } from "@/theme";

interface IconBadgeProps {
  size?: number;
  radius?: number | string;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

const IconBadge = ({ size = 32, radius = 1.8, children, sx }: IconBadgeProps) => (
  <Box
    sx={{
      width: size,
      height: size,
      borderRadius: radius,
      display: "grid",
      placeItems: "center",
      flexShrink: 0,
      color: "primary.main",
      backgroundColor: brandAlpha(0.1),
      ...sx,
    }}
  >
    {children}
  </Box>
);

export default IconBadge;
