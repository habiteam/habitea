import { getAppLayout } from '@components/AppLayout/AppLayout';
import Activity from '@components/Activity/Activity';
import userAtom from '@atoms/user';
import { useAtomValue } from 'jotai';

export default function Home() {
  const user = useAtomValue(userAtom);
  return (
    <>
      <h2>Welcome {user?.displayName ?? user?.email}</h2>

      <Activity></Activity>
    </>
  );
}

Home.getLayout = getAppLayout;
