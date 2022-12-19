import { getAppLayout } from '@components/AppLayout/AppLayout';
import Activity from '@components/Activity/Activity';
import userAtom from '@atoms/user';
import { useAtomValue } from 'jotai';
import DurationInput from '@commonComponents/DurationInput/DurationInput';
import Head from 'next/head';

export default function Home() {
  const user = useAtomValue(userAtom);
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <h2>Welcome {user?.displayName ?? user?.email}</h2>

      <Activity></Activity>
    </>
  );
}

Home.getLayout = getAppLayout;
