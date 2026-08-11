import { Chip, Paper, Stack, Typography } from "@mui/material";

interface PageHeaderProps {
  overline?: string;
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
}

const PageHeader = ({
  overline = "SGS TOOLS",
  title,
  subtitle,
  badge,
}: PageHeaderProps) => (
  <Paper
    sx={{
      p: 1.5,
      background:
        "linear-gradient(135deg, rgba(15,118,110,0.08), rgba(148,163,184,0.06))",
      borderColor: "rgba(148,163,184,0.55)",
    }}
  >
    <Stack spacing={1}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1}>
        <Typography
          variant="overline"
          sx={{ color: "primary.main", fontWeight: 700, letterSpacing: "0.18em" }}
        >
          {overline}
        </Typography>
        {badge ?? <Chip label="移动端" size="small" color="primary" variant="outlined" />}
      </Stack>
      <Typography variant="h5" sx={{ color: "text.primary" }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </Stack>
  </Paper>
);

export default PageHeader;
