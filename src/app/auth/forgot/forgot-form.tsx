'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const forgotSchema = z.object({
  email: z.string().email(),
});

export type ForgotValues = z.infer<typeof forgotSchema>;

export function ForgotForm() {
  const form = useForm<ForgotValues>({
    resolver: zodResolver(forgotSchema),
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data: ForgotValues) {
    setLoading(true);
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Digite seu email"
            {...form.register('email')}
          />
        </div>

        <Button
          className="w-full"
          type="submit"
          disabled={loading || !form.formState.isValid}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Recuperar
        </Button>
      </div>
    </form>
  );
}
