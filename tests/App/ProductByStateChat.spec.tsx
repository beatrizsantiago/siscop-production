import { render, screen, act } from '@testing-library/react';
import { ProducsByStateDataType } from '../../src/types/chart';
import ProductByStateChat from '../../src/App/ProductByStateChat';
import GetDataUseCase from '../../src/usecases/getProductsByState';

jest.mock('react-chartjs-2', () => ({
  Bar: (props: any) => (
    <div data-testid="bar-chart">
      {JSON.stringify(props.data)}
    </div>
  )
}));

jest.mock('../../src/usecases/getProductsByState');

describe('ProductByStateChat', () => {
  const mockData: ProducsByStateDataType = [
    { productName: 'Tomate', amount: 12 },
    { productName: 'Alface', amount: 5 },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading indicator while fetching data', async () => {
    (GetDataUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockImplementation(() => new Promise(() => {}))
    }));

    await act(async () => {
      render(<ProductByStateChat state="WAITING" />);
    });

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should render message when no data is returned', async () => {
    (GetDataUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue([]),
    }));

    await act(async () => {
      render(<ProductByStateChat state="IN_PRODUCTION" />);
    });

    expect(screen.getByText('Nenhum produto encontrado.')).toBeInTheDocument();
  });

  it('should render chart with correct data when data is available', async () => {
    (GetDataUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(mockData),
    }));

    await act(async () => {
      render(<ProductByStateChat state="READY" />);
    });

    const chart = screen.getByTestId('bar-chart');
    expect(chart).toBeInTheDocument();
    expect(chart.textContent).toContain('Tomate');
    expect(chart.textContent).toContain('Alface');
  });
});
