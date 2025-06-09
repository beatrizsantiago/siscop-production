import { GetProductByStateUseCase } from '../../src/usecases/getProductsByState';
import { KardexRepository } from '../../src/domain/repositories/KardexRepository';
import { ProducsByStateDataType } from '../../src/types/chart';

describe('GetProductByStateUseCase', () => {
  let kardexRepository: jest.Mocked<KardexRepository>;
  let useCase: GetProductByStateUseCase;

  beforeEach(() => {
    kardexRepository = {
      getProductsByState: jest.fn(),
    } as unknown as jest.Mocked<KardexRepository>;

    useCase = new GetProductByStateUseCase(kardexRepository);
  });

  it('should call kardexRepository.getProductsByState with the correct state', async () => {
    const mockData: ProducsByStateDataType = [
      { productName: 'Tomato', amount: 10 },
    ];

    kardexRepository.getProductsByState.mockResolvedValue(mockData);

    const result = await useCase.execute('READY');

    expect(kardexRepository.getProductsByState).toHaveBeenCalledWith('READY');
    expect(result).toEqual(mockData);
  });

  it('should return an empty array when repository returns empty', async () => {
    kardexRepository.getProductsByState.mockResolvedValue([]);

    const result = await useCase.execute('IN_PRODUCTION');

    expect(result).toEqual([]);
  });
});
