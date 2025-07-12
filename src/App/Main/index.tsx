import { Box } from '@mui/material';
import ProductByStateChart from '@App/ProductByStateChart';
import ChartContainer from './components/ChartContainer';

const Main = () => {
  return (
    <Box padding={2} display="flex" flexDirection="column" gap={2} maxWidth="100%">
      <ChartContainer label="Aguardando plantio">
        <ProductByStateChart state="WAITING" />
      </ChartContainer>
      <ChartContainer label="Plantados">
        <ProductByStateChart state="IN_PRODUCTION" />
      </ChartContainer>
      <ChartContainer label="Colhidos (Prontos para venda)">
        <ProductByStateChart state="READY" />
      </ChartContainer>
    </Box>
  );
};

export default Main;
