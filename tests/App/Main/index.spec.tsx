import { render, screen } from '@testing-library/react';
import Main from '../../../src/App/Main';

jest.mock('../../../src/App/ProductByStateChat', () => ({
  __esModule: true,
  default: ({ state }: { state: string }) => <div data-testid={`chart-${state}`}>Chart for {state}</div>,
}));

describe('Main (Chart Dashboard)', () => {
  it('should render all ChartContainers with the correct labels and ProductByStateChat for each state', () => {
    render(<Main />);

    expect(screen.getByText('Aguardando plantio')).toBeInTheDocument();
    expect(screen.getByText('Plantados')).toBeInTheDocument();
    expect(screen.getByText('Colhidos')).toBeInTheDocument();

    expect(screen.getByText('Chart for WAITING')).toBeInTheDocument();
    expect(screen.getByText('Chart for IN_PRODUCTION')).toBeInTheDocument();
    expect(screen.getByText('Chart for READY')).toBeInTheDocument();
  });
});
