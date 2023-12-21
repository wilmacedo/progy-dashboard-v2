import { Separator } from '@/components/ui/separator';
import { getServerAuth } from '@/contexts/auth/get-server-auth';
import { api } from '@/services/api';
import { Notification } from '@/types/request';
import { ServerOff } from 'lucide-react';
import { NotificationForm } from './notification-form';

async function getNotifications(): Promise<Notification | null> {
  const userData = getServerAuth();
  if (userData === null) {
    return null;
  }

  try {
    const { data, status } = await api<Notification>(
      '/notifications/' + userData.user.id,
    );
    if (status !== 200) {
      return null;
    }

    return data;
  } catch (error) {
    return null;
  }
}

export default async function Page() {
  const notifications = await getNotifications();
  if (!notifications) {
    return (
      <div className="w-full flex items-center justify-center gap-2 text-muted-foreground text-sm">
        <ServerOff strokeWidth={1.5} />
        <p>Oops! Parece que houve um erro ao carregar essa sessão.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="mb-1 text-xl font-semibold">Notificações</h2>
        <p className=" text-sm text-muted-foreground">
          Revise e atualize suas preferências de notificação aqui
        </p>
      </div>
      <Separator />

      <NotificationForm notification={notifications} />
    </div>
  );
}
