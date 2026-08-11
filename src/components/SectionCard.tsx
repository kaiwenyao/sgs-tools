import { Box, Paper, Stack, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";

interface SectionCardProps {
  title?: React.ReactNode;
  titleVariant?: "h6" | "subtitle1";
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
}

const SectionCard = ({
  title,
  titleVariant = "h6",
  subtitle,
  icon,
  action,
  children,
  sx,
}: SectionCardProps) => {
  const hasHeader = Boolean(title || subtitle || icon || action);

  return (
    <Paper sx={{ p: 1.5, ...sx }}>
      {hasHeader && (
        <Stack direction="row" spacing={1} alignItems={icon ? "flex-start" : "center"}>
          {icon}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {title && <Typography variant={titleVariant}>{title}</Typography>}
            {subtitle && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          {action}
        </Stack>
      )}
      {children && <Box sx={{ mt: hasHeader ? 1 : 0 }}>{children}</Box>}
    </Paper>
  );
};

export default SectionCard;
