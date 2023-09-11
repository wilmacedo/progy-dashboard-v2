import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const memberFormSchema = z.object({
  email: z.string().email(),
  institutionId: z.number().nonnegative(),
  roleId: z.number().nonnegative(),
});

type MemberFormTypes = z.infer<typeof memberFormSchema>;

export function MemberForm() {
  const form = useForm<MemberFormTypes>({
    resolver: zodResolver(memberFormSchema),
  });

  function handleSubmit(data: MemberFormTypes) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}></form>
    </Form>
  );
}
