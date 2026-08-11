import type { BoxProps } from "@mui/material";

import RoundIcon from "./RoundIcon";
import ljImage from "@/assets/icons/lijue.jpg";

const LjIcon = (props: BoxProps) => <RoundIcon src={ljImage} alt="李傕" {...props} />;

export default LjIcon;
