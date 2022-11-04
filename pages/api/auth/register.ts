import type { NextApiRequest, NextApiResponse } from 'next';
import { registerUser } from '../../../common/services/firebase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    registerUser(req.body.email, req.body.password)
      .then((userCredential) => {
        res.status(200).json(userCredential);
      })
      .catch((error) => res.status(400).json(error));
  }
}
