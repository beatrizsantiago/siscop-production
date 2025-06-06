import { ProducsByStateDataType } from '@generalTypes/chart';

export interface KardexRepository {
  getProductsByState(state: string): Promise<ProducsByStateDataType>;
};
