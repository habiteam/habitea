import { notificationsAtom } from '@atoms/notifications';
import { Color } from '@constants/palette';
import { useSetAtom } from 'jotai';
import { generateUUID } from './uuid';

export function useAddNotification() {
  const setNotificationsAtom = useSetAtom(notificationsAtom);

  return (props: { message: string; type: Color }) => {
    setNotificationsAtom((values) => [
      ...values,
      { id: generateUUID(), ...props },
    ]);
  };
}
