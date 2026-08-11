import type { BoxProps } from "@mui/material";

import RoundIcon from "./RoundIcon";
import sxyImage from "@/assets/icons/shenxunyu.jpg";

const SxyIcon = (props: BoxProps) => <RoundIcon src={sxyImage} alt="神荀彧" {...props} />;

export default SxyIcon;
