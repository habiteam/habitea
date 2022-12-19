import notifications from '@atoms/notifications';
import { Color } from '@constants/palette';
import { useSetAtom } from 'jotai';
import { generateUUID } from './uuid';

export function useAddNotification() {
  const setNotificationsAtom = useSetAtom(notifications);

  return (props: { message: string; type: Color }) => {
    setNotificationsAtom((values) => [
      ...values,
      { id: generateUUID(), ...props },
    ]);
  };
}
