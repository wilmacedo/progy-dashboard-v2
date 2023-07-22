import { Switch } from '@/components/ui/switch';
import { Notification } from './page';

interface OptionsProps {
  notifications: Notification[];
}

export function Options({ notifications }: OptionsProps) {
  return (
    <div className="flex flex-col gap-4">
      {notifications.map((notification, index) => (
        <div className="flex gap-2" key={index}>
          <Switch />
          <span>{notification.name}</span>
        </div>
      ))}
    </div>
  );
}
