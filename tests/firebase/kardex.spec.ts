import { FirebaseKardex } from '../../src/firebase/kardex';
import { getDocs, getDoc } from 'firebase/firestore';

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(),
  getDoc: jest.fn(),
}));

describe('FirebaseKardex', () => {
  const mockedGetDocs = getDocs as jest.Mock;
  const mockedGetDoc = getDoc as jest.Mock;

  const mockProductRef = { id: 'prod1' };

  const mockDoc = (data: any) => ({
    data: () => data,
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return an empty array when no documents are found', async () => {
    mockedGetDocs.mockResolvedValue({ docs: [] });

    const repo = new FirebaseKardex();
    const result = await repo.getProductsByState('READY');

    expect(result).toEqual([]);
    expect(mockedGetDocs).toHaveBeenCalledTimes(1);
  });

  it('should return aggregated product data for a given state', async () => {
    mockedGetDocs.mockResolvedValue({
      docs: [
        mockDoc({ amount: 10, product_id: mockProductRef }),
        mockDoc({ amount: 15, product_id: mockProductRef }),
      ],
    });

    mockedGetDoc.mockResolvedValue({
      data: () => ({ name: 'Tomato' }),
    });

    const repo = new FirebaseKardex();
    const result = await repo.getProductsByState('READY');

    expect(result).toEqual([{ productName: 'Tomato', amount: 25 }]);
    expect(mockedGetDocs).toHaveBeenCalledTimes(1);
    expect(mockedGetDoc).toHaveBeenCalledTimes(2);
  });

  it('should skip products with amount less than or equal to 0', async () => {
    mockedGetDocs.mockResolvedValue({
      docs: [
        mockDoc({ amount: 0, product_id: mockProductRef }),
        mockDoc({ amount: -5, product_id: mockProductRef }),
      ],
    });

    const repo = new FirebaseKardex();
    const result = await repo.getProductsByState('READY');

    expect(result).toEqual([]);
    expect(mockedGetDoc).not.toHaveBeenCalled();
  });

  it('should handle missing product data gracefully', async () => {
    mockedGetDocs.mockResolvedValue({
      docs: [
        mockDoc({ amount: 10, product_id: mockProductRef }),
      ],
    });

    mockedGetDoc.mockResolvedValue({
      data: () => null,
    });

    const repo = new FirebaseKardex();
    const result = await repo.getProductsByState('READY');

    expect(result).toEqual([{ productName: '', amount: 10 }]);
  });
});
