import { api } from '@/services/api/server';
import { Institution, Role } from '@/types/request';
import MembersForm from './Form';

const getInstitutions = async () => {
  const { data, error } = await api<Institution[]>({
    method: 'GET',
    route: '/institution',
  });
  if (error || !data) {
    console.error(error);
    return [];
  }

  return data;
};

const getRoles = async () => {
  const { data, error } = await api<Role[]>({ method: 'GET', route: '/roles' });
  if (error || !data) {
    console.error(error);
    return [];
  }

  return data;
};

export default async function Members() {
  const [institutions, roles] = await Promise.all([
    getInstitutions(),
    getRoles(),
  ]);

  return <MembersForm institutions={institutions} roles={roles} />;
}
