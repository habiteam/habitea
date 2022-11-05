import { useSetAtom } from 'jotai';
import { v4 } from 'uuid';
import notifications from '../../../common/atoms/notifications';
import { getCategoriesLayout } from '../../../components/CategoriesLayout/CategoriesLayout';

export default function Categories() {
  const setNotificationsAtom = useSetAtom(notifications);

  function addNotification() {
    setNotificationsAtom((values) => [
      ...values,
      { id: v4(), message: 'Jakieś info', type: 'info' },
    ]);
  }

  return (
    <>
      <button onClick={addNotification}>Add notif</button>
    </>
  );
}

Categories.getLayout = getCategoriesLayout;
