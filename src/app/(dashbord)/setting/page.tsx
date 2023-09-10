import { Separator } from '@/components/ui/separator';
import { api } from '@/services/api';
import { User } from '@/types/requests';
import { ServerOff } from 'lucide-react';
import { ProfileForm } from './profile-form';

async function getUser(): Promise<User | null> {
  const { data, status } = await api<User>('/users/me');
  if (status !== 200) {
    return null;
  }

  return data;
}

export default async function Page() {
  const user = await getUser();
  if (!user) {
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
        <h2 className="mb-1 text-xl font-semibold">Informação pessoal</h2>
        <p className=" text-sm text-muted-foreground">
          Atualize e revise suas informações pessoais
        </p>
      </div>
      <Separator />
      <ProfileForm user={user} />
    </div>
  );
}
