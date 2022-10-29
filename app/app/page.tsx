'use client';

import { doc, getDoc } from 'firebase/firestore';
import { database } from '../../common/services/firebase';

export default function Home() {
  async function callDb() {
    const docRef = doc(database, 'Dogs', 'Husky');
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data());
  }
  return (
    <>
      <h1>Hello app</h1>
      <button onClick={callDb}>Let&apos;s go</button>
    </>
  );
}
