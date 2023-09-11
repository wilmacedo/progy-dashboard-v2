import { MemberTable } from '@/components/member-table/member-table';
import { Separator } from '@/components/ui/separator';
import { api } from '@/services/api';
import { User } from '@/types/requests';
import { columns } from './columns';

async function getMembers() {
  try {
    const { data, status } = await api<User[]>('/users');
    if (status !== 200) {
      return [];
    }

    return data;
  } catch (error) {
    return [];
  }
}

export default async function Page() {
  const users = await getMembers();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="mb-1 text-xl font-semibold">Membros</h2>
        <p className=" text-sm text-muted-foreground">
          Gerencie os membros de cada institutição e planejamento aqui
        </p>
      </div>
      <Separator />

      <MemberTable columns={columns} data={users} />
    </div>
  );
}
