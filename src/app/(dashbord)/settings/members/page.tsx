import { Separator } from '@/components/ui/separator';
import { api } from '@/services/api';
import { Institution } from '@/types/request';
import { User } from '@/types/requests';
import { columns } from './columns';
import { MemberTable } from './member-table';

interface Member extends User {
  role: string;
}

async function getMembers() {
  try {
    const { data, status } = await api<Member[]>('/users');
    if (status !== 200) {
      return [];
    }

    return data;
  } catch (error) {
    return [];
  }
}

async function getInstitutions() {
  try {
    const { data, status } = await api<Institution[]>('/institutions');
    if (status !== 200) {
      return [];
    }

    return data;
  } catch (error) {
    return [];
  }
}

export default async function Page() {
  const [users, institutions] = await Promise.all([
    getMembers(),
    getInstitutions(),
  ]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="mb-1 text-xl font-semibold">Membros</h2>
        <p className=" text-sm text-muted-foreground">
          Convide e gerencie os membros de cada institutição e planejamento aqui
        </p>
      </div>
      <Separator />

      <MemberTable columns={columns} data={users} lists={{ institutions }} />
    </div>
  );
}
