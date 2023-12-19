import { Role } from '@/constants/roles';
import { api } from '@/services/api/server';
import { Institution } from '@/types/request';
import { validateBase64 } from '@/utils';
import InvitePage from './Invite';

interface InviteProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export interface InviteData {
  email: string;
  institution_id: number;
  role: Role;
  expiration?: number;
  token: string;
}

async function getInstitution(id: number) {
  const empty = 'N/A';
  if (id === 0 || typeof id === 'undefined') return empty;

  const { data, error } = await api<Institution>({
    method: 'GET',
    route: `/institutions/${id}`,
  });

  if (error || !data) return empty;

  return data;
}

function getTokenData({ searchParams }: InviteProps) {
  const result = {} as InviteData;

  const { token } = searchParams;
  if (!token || typeof token !== 'string') return result;

  try {
    if (!validateBase64(token)) return result;

    const decodedData = atob(token);
    if (!decodedData) return result;

    const data = JSON.parse(decodedData) as InviteData;
    if (!data) return result;

    return data;
  } catch (error) {
    return result;
  }
}

export default async function Invite(props: InviteProps) {
  const data = getTokenData(props);

  let institution = await getInstitution(data.institution_id);
  if (typeof institution === 'string') {
    institution = {
      id: -1,
      name: 'N/A',
      code: 'N/A',
    };
  }

  return (
    <div>
      <InvitePage data={data} institution={institution} />
    </div>
  );
}
