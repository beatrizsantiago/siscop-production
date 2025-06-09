import { Box } from '@mui/material';
import ProductByStateChat from '@App/ProductByStateChat';
import ChartContainer from './components/ChartContainer';

const Main = () => {
  return (
    <Box padding={2} display="flex" flexDirection="column" gap={2} maxWidth="100%">
      <ChartContainer label="Aguardando plantio">
        <ProductByStateChat state="WAITING" />
      </ChartContainer>
      <ChartContainer label="Plantados">
        <ProductByStateChat state="IN_PRODUCTION" />
      </ChartContainer>
      <ChartContainer label="Colhidos">
        <ProductByStateChat state="READY" />
      </ChartContainer>
    </Box>
  );
};

export default Main;
