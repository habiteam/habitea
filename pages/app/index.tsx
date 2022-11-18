import Datepicker from '@commonComponents/Datepicker/Datepicker';
import { auth } from '@services/firebase';
import { getAppLayout } from '@components/AppLayout/AppLayout';

export default function App() {
  return (
    <>
      <h2>
        Welcome {auth.currentUser?.displayName ?? auth.currentUser?.email}
        <Datepicker onSelect={(date) => console.log(date)}></Datepicker>
      </h2>
    </>
  );
}

App.getLayout = getAppLayout;
