import { auth } from '@services/firebase';
import { getAppLayout } from '@components/AppLayout/AppLayout';
import Button from '@commonComponents/Button/Button';
import Router from 'next/router';

export default function Home() {
  return (
    <>
      <h2>
        {/* TODO: onAuthStateChanged */}
        Welcome {auth.currentUser?.displayName ?? auth.currentUser?.email}
      </h2>

      <Button
        fillType="filled"
        color="info"
        onClick={() => Router.push('/app/activity')}
      >
        Start Activity
      </Button>
    </>
  );
}

Home.getLayout = getAppLayout;
