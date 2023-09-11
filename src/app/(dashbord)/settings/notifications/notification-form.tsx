'use client';

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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const notificationFormSchema = z.object({
  initiative: z.boolean().default(false).optional(),
  activity: z.boolean().default(false).optional(),
});

type NotificationFormValues = z.infer<typeof notificationFormSchema>;

export function NotificationForm() {
  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      activity: true,
      initiative: true,
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-8 max-w-3xl">
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <FormField
                control={form.control}
                name="initiative"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Emails de iniciativas
                      </FormLabel>
                      <FormDescription className="text-xs text-muted-foreground">
                        Receba emails sobre as atualizações e avisos das
                        iniciativas
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
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
                        disabled
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>
      </form>
    </Form>
  );
}
