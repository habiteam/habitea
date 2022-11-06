import { atom } from 'jotai';
import { NotificationPropsSchema } from '../components/Notifications/Notification.schema';

export const notifications = atom<NotificationPropsSchema[]>([]);

// export function addNotification() {
//   setNotificationsAtom((values) => [
//     ...values,
//     { id: v4(), message: 'Jakieś info', type: 'info' },
//   ]);
// }
