import { Box } from "@mui/material";
import type { BoxProps } from "@mui/material";

interface RoundIconProps extends BoxProps {
  src: string;
  alt: string;
}

const RoundIcon = ({ src, alt, sx, ...rest }: RoundIconProps) => (
  <Box
    component="img"
    src={src}
    alt={alt}
    sx={{ width: 60, height: 60, borderRadius: "50%", objectFit: "cover", ...sx }}
    {...rest}
  />
);

export default RoundIcon;
