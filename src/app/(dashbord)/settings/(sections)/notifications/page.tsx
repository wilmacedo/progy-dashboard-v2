import { fields } from './config';
import { Options } from './Options';

export interface Notification {
  key: string;
  name: string;
}

interface NotificationList {
  [key: string]: Notification[];
}

async function getNotifications() {
  //  TODO: Add notifications endpoint

  await new Promise(resolve => setTimeout(resolve, 3000));

  const notifications: Notification[] = [
    { key: 'activity', name: 'Atrasdas' },
    { key: 'activity', name: 'Para atrasar' },
    { key: 'initiative', name: 'Atrasdas' },
    { key: 'initiative', name: 'Para atrasar' },
  ];

  return notifications;
}

export default async function NotificationLayout() {
  const allNotifications = await getNotifications();

  const getAgroupedNotifications = () => {
    const keys: string[] = [];
    allNotifications.forEach(notification => {
      if (!keys.includes(notification.key)) keys.push(notification.key);
    });

    const agroupedNotifications: NotificationList = {};
    keys.forEach(key => {
      const notifications: Notification[] = [];

      allNotifications.forEach(notification => {
        if (notification.key === key) notifications.push(notification);
      });

      agroupedNotifications[key] = notifications;
    });

    return agroupedNotifications;
  };

  return (
    <div>
      {fields.map((field, index) => (
        <div
          className="pt-7 pb-8 flex items-center border-b border-gray-100"
          key={index}
        >
          <div className="w-[30rem]">
            <span>{field.name}</span>
            <p className="max-w-[13rem] text-sm text-gray-500">
              {field.description}
            </p>
          </div>

          <Options
            key={index}
            notifications={getAgroupedNotifications()[field.key]}
          />
        </div>
      ))}
    </div>
  );
}
