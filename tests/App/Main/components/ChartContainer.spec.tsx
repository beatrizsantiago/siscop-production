import { render, screen } from '@testing-library/react';
import ChartContainer from '../../../../src/App/Main/components/ChartContainer';

describe('ChartContainer', () => {
  it('should render the label and children properly', () => {
    render(
      <ChartContainer label="Test Chart">
        <div>Mock Chart Content</div>
      </ChartContainer>
    );

    expect(screen.getByText('Test Chart')).toBeInTheDocument();

    expect(screen.getByText('Mock Chart Content')).toBeInTheDocument();
  });
});
