import { Separator } from '@/components/ui/separator';
import { NotificationForm } from './notification-form';

export default function Page() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="mb-1 text-xl font-semibold">Notificações</h2>
        <p className=" text-sm text-muted-foreground">
          Revise e atualize suas preferências de notificação aqui
        </p>
      </div>
      <Separator />

      <NotificationForm />
    </div>
  );
}
