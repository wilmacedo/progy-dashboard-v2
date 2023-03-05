'use client';

import Input from '@/components/Input';

// const mockedUser: User = {
//   id: 2,
//   name: 'Wil Macedo',
//   email: 'wil@gmail.com',
//   role_id: 4,
//   institution_id: 1,
// };

export default function Detail() {
  // const { isAuthenticated } = useAuth();
  // const [, setUserData] = useState<User | undefined>(mockedUser);

  // useEffect(() => {
  //   if (!isAuthenticated) return;

  //   (async () => {
  //     const { data: response } = await api.get('/users/me');
  //     if (response.error) {
  //       toast.error('Erro ao carregar as informações do usuário');
  //       return;
  //     }

  //     setUserData(response.data);
  //   })();
  // }, []);

  return (
    <div className="w-[70%]">
      <div className="flex items-center justify-between">
        <span>Nome</span>
        <Input />
      </div>
    </div>
  );
}
