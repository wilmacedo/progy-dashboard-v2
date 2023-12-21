'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/auth/auth-context';
import { Notification } from '@/types/request';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { notificationAction } from './notification-action';

const notificationFormSchema = z.object({
  activity: z.boolean().default(true).optional(),
});

export type NotificationFormValues = z.infer<typeof notificationFormSchema>;

interface NotificationFormProps {
  notification: Notification;
}

export function NotificationForm({ notification }: NotificationFormProps) {
  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      activity: notification.activity,
    },
  });
  const { user } = useAuth();

  async function handleSubmit(data: NotificationFormValues) {
    const { error } = await notificationAction(data, user.id);
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Oops! Houve um erro ao tentar atualizar suas informações',
        description: error,
      });
      return;
    }

    toast({
      title: 'Notificações atualizadas!',
    });
  }

  return (
    <Form {...form}>
      <form
        className="space-y-8 max-w-3xl"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <FormField
                control={form.control}
                name="activity"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Emails de atividades
                      </FormLabel>
                      <FormDescription className="text-xs text-muted-foreground">
                        Receba emails sobre as atualizações e avisos das
                        atividades
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>

        <div className="w-full flex items-center justify-end">
          <Button disabled={!form.formState.isValid} type="submit">
            Atualizar
          </Button>
        </div>
      </form>
    </Form>
  );
}
