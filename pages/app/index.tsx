import { auth } from '../../common/services/firebase';
import { getAppLayout } from '../../components/AppLayout/AppLayout';

export default function App() {
  return (
    <>
      <h2>
        Welcome {auth.currentUser?.displayName ?? auth.currentUser?.email}
      </h2>
    </>
  );
}

App.getLayout = getAppLayout;
