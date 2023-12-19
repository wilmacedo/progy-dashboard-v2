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
  role: string;
  expiration?: number;
  token: string;
}

async function getInsitutionName(id: number) {
  const empty = 'N/A';
  if (id === 0 || typeof id === 'undefined') return empty;

  const { data, error } = await api<Institution>({
    method: 'GET',
    route: `/institution/${id}`,
  });

  if (error || !data) return empty;

  return data.name;
}

async function getRoleName(role: string) {
  const empty = 'N/A';
  if (role.length === 0 || typeof role === 'undefined') return empty;

  return empty;
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
    console.warn(error);
    return result;
  }
}

export default async function Invite(props: InviteProps) {
  const data = getTokenData(props);

  const institutionName = await getInsitutionName(data.institution_id);
  const roleName = await getRoleName(data.role);

  const names = {
    institution_id: institutionName,
    role: roleName,
  };

  return (
    <div>
      <InvitePage data={data} names={names} />
    </div>
  );
}
