'use client';

import { Checkbox } from '@/components/checkbox';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/auth/auth-context';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { signInAction } from './signin-action';

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  remember: z.boolean().default(false),
});

export type SignInValues = z.infer<typeof signInSchema>;

export function SigninForm() {
  const [loading, setLoading] = useState(false);
  const { updateAuthenticateData } = useAuth();
  const router = useRouter();

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
  });

  async function onSubmit(data: SignInValues) {
    setLoading(true);

    const { data: response, error } = await signInAction(data);
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Oops! Houve um erro ao tentar entrar.',
        description: error,
      });
      setLoading(false);

      return;
    }

    updateAuthenticateData(response!);
    router.push('/');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Digite seu email"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Digite sua senha"
                    minLength={6}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="my-2 w-full inline-flex items-center justify-between">
          <FormField
            control={form.control}
            name="remember"
            render={({ field }) => (
              <div className="flex items-center gap-2">
                <Checkbox {...field} />
                <label htmlFor="remember" className="text-xs">
                  Relembrar por 30 dias
                </label>
              </div>
            )}
          />

          <Button variant="link" className="px-0 text-xs" asChild>
            <Link href={'/forgot'}>Esqueceu sua senha?</Link>
          </Button>
        </div>

        <Button disabled={loading} className="w-full" type="submit">
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Entrar
        </Button>
      </form>
    </Form>
  );
}
