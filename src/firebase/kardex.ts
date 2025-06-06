import { KardexRepository } from '@domain/repositories/KardexRepository';
import { collection, query, where, getDocs, DocumentReference, getDoc } from 'firebase/firestore';
import { ProducsByStateDataType } from '@generalTypes/chart';

import { firestore } from './config';

export class FirebaseKardex implements KardexRepository {
  async getProductsByState(state: string): Promise<ProducsByStateDataType> {
    const q = query(
      collection(firestore, 'kardex'),
      where('state', '==', state)
    );

    const snapshot = await getDocs(q);

    const productMap: Record<string, { name: string; amount: number }> = {};

    for (const doc of snapshot.docs) {
      const data = doc.data();

      const amount = data.amount ?? 0;
      if (amount <= 0) continue;

      const productRef = data.product_id as DocumentReference;
      const productSnap = await getDoc(productRef);
      const productData = productSnap.data();
      const productId = productRef.id;
      const productName = productData?.name ?? '';

      if (!productMap[productId]) {
        productMap[productId] = { name: productName, amount: 0 };
      }

      productMap[productId].amount += amount;
    }

    return Object.entries(productMap).map(([, { name, amount }]) => ({
      productName: name,
      amount,
    }));
  }
};

export const firebaseKardex = new FirebaseKardex();
