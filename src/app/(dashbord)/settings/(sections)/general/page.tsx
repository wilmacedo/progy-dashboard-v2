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

  const fields = [
    {
      label: 'Nome',
      description: 'Altere seu nome',
      key: 'name',
    },
  ];

  return (
    <div>
      {fields.map((field, index) => (
        <div className="pt-4 pb-8 flex border-b border-gray-100" key={index}>
          <div className="w-[30rem]">
            <span>{field.label}</span>
            <p className="text-sm text-gray-500">{field.description}</p>
          </div>
          <Input className="w-full max-w-lg" placeholder="Digite seu nome" />
        </div>
      ))}
    </div>
  );
}
