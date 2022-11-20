import { auth } from '@services/firebase';
import { getAppLayout } from '@components/AppLayout/AppLayout';
import Activity from '@components/Activity/Activity';

export default function Home() {
  return (
    <>
      <h2>
        {/* TODO: onAuthStateChanged */}
        Welcome {auth.currentUser?.displayName ?? auth.currentUser?.email}
      </h2>

      <Activity></Activity>
    </>
  );
}

Home.getLayout = getAppLayout;
