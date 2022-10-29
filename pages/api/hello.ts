// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { doc, getDoc } from 'firebase/firestore';
import { database } from '../../common/services/firebase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const docRef = doc(database, 'Dogs', 'Husky');
  const docSnap = await getDoc(docRef);
  res.status(200).json(docSnap.data());
}
