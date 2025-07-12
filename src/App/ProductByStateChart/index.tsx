
import { useEffect, useState, useCallback } from 'react';
import { useTheme, alpha, Box, CircularProgress, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { ProducsByStateDataType } from '@generalTypes/chart';
import { firebaseKardex } from '@fb/kardex';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import GetDataUseCase from '@usecases/getProductsByState';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type Props = {
  state: string,
};

const ProductByStateChart = ({ state }:Props) => {
  const theme = useTheme();
  const [chartData, setChartData] = useState<ProducsByStateDataType>([]);
  const [loading, setLoading] = useState(false);

  const getChartData = useCallback(async () => {
    setLoading(true);
    try {
      const getUserCase = new GetDataUseCase(firebaseKardex);
      const data = await getUserCase.execute(state);
      setChartData(data);
    } catch {
      toast.error('Erro ao buscar os dados!');
    } finally {
      setLoading(false);
    }
  }, [state]);

  useEffect(() => {
    getChartData();
  }, [getChartData]);

  if(loading) {
    return (
      <Box
        width="100%"
        height={300}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress size={24} />
      </Box>
    );
  };

  if(chartData.length === 0) {
    return (
      <Box
        width="100%"
        height={{ xs: 100, md: 320 }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="body1" color="textSecondary">
          Nenhum produto encontrado.
        </Typography>
      </Box>
    );
  };

  return (
    <Bar
      data={{
        labels: chartData.map(p => p.productName),
        datasets: [
          {
            label: 'Quantidade',
            data: chartData.map(p => p.amount),
            backgroundColor: alpha(theme.palette.secondary.light, 0.6),
            borderColor: theme.palette.secondary.main,
            borderWidth: 1,
          },
        ],
      }}
      height={320}
      options={{
        responsive: false,
        plugins: {
          legend: { display: false },
        },
      }}
    />
  );
}

export default ProductByStateChart;
