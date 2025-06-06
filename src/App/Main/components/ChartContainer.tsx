import { Box, Typography } from '@mui/material';

type Props = {
  label: string;
  children: React.ReactNode;
}

const ChartContainer = ({ label, children }:Props) => (
  <Box
    width={{ xs: '100%', md: '49.5%' }}
    bgcolor="#fff"
    padding={3}
    borderRadius={3}
    overflow="hidden"
  >
    <Typography variant="h6" fontWeight={500} marginBottom={2}>
      {label}
    </Typography>
    {children}
  </Box>
);

export default ChartContainer;
