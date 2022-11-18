import { atom } from 'jotai';
import { NotificationPropsSchema } from '@commonComponents/Notifications/Notification.schema';

export default atom<NotificationPropsSchema[]>([]);

// export function addNotification() {
//   setNotificationsAtom((values) => [
//     ...values,
//     { id: v4(), message: 'Jakieś info', type: 'info' },
//   ]);
// }
