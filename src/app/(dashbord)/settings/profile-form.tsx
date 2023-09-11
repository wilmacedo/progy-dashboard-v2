'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { roleAlias } from '@/constants/roles';
import { User } from '@/types/requests';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { profileAction } from './profile-action';

const profileFormSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
  role: z.string(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileFormProps {
  user: User;
}

interface Config {
  title: string;
  description?: string;
  disabled?: boolean;
  key: keyof ProfileFormValues;
}

const configs: Config[] = [
  { title: 'Nome', key: 'name' },
  {
    title: 'Email',
    description: 'Ainda não é possível alterar o seu e-mail',
    key: 'email',
    disabled: true,
  },
  {
    title: 'Cargo',
    key: 'role',
    disabled: true,
  },
];

export function ProfileForm({ user }: ProfileFormProps) {
  const role =
    roleAlias.find(role => role.legacy === user.role)?.name ?? user.role;
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: { ...user, role },
  });

  async function handleSubmit(data: ProfileFormValues) {
    const { error } = await profileAction(data, user.id);
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Oops! Houve um erro ao tentar atualizar suas informações',
        description: error,
      });
      return;
    }

    toast({
      title: 'Informações atualizadas!',
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-8 max-w-3xl"
      >
        {configs.map((config, index) => (
          <FormField
            key={index}
            control={form.control}
            name={config.key}
            render={({ field }) => (
              <FormItem className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex flex-col justify-center">
                  <FormLabel>{config.title}</FormLabel>
                  {config.description && (
                    <FormDescription className="text-muted-foreground">
                      {config.description}
                    </FormDescription>
                  )}
                </div>
                <FormControl>
                  <Input disabled={config.disabled} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        ))}

        <div className="w-full flex items-center justify-end">
          <Button disabled={!form.formState.isValid} type="submit">
            Atualizar
          </Button>
        </div>
      </form>
    </Form>
  );
}
