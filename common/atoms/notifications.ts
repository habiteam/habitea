import { atom } from 'jotai';
import { NotificationPropsSchema } from '@commonComponents/Notifications/Notification.schema';

export const notificationsAtom = atom<NotificationPropsSchema[]>([]);

// import notifications from '@atoms/notifications';
// import { generateUUID } from '@utils/uuid';
//
// export function addNotification() {
//   setNotificationsAtom((values) => [
//     ...values,
//     { id: generateUUID(), message: 'Jakieś info', type: 'info' },
//   ]);
// }
