'use client';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { toast } from '@/components/ui/use-toast';
import { roleAlias } from '@/constants/roles';
import { Institution } from '@/types/request';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckIcon, ChevronsUpDown, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';
import { memberInviteAction } from './member-invite-action';

const memberFormSchema = z.object({
  email: z.string().email(),
  institutionId: z.number().nonnegative(),
  role: z.string(),
});

export type MemberFormValues = z.infer<typeof memberFormSchema>;

interface MemberDialogFormProps {
  lists: {
    institutions: Institution[];
  };
}

export function MemberDialogForm({
  lists: { institutions },
}: MemberDialogFormProps) {
  const form = useForm<MemberFormValues>({
    resolver: zodResolver(memberFormSchema),
  });

  async function handleSubmit(data: MemberFormValues) {
    const { error } = await memberInviteAction(data);
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Oops! Houve um erro ao enviar o convite',
        description: error,
      });
      return;
    }

    toast({
      title: 'Convite enviado com sucesso!',
    });
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" size="sm" className="ml-2 hidden h-8 lg:flex">
          <Send className="mr-2 h-4 w-4" />
          Convidar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <DialogTitle>Convidar membro</DialogTitle>
              <DialogDescription>
                Convide um membro do planejamento para acessar o painel de
                controle
              </DialogDescription>
            </DialogHeader>
            <div className="my-4 space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="exemplo@gmail.com"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="institutionId"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Instituição</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={twMerge(
                              'w-72 justify-between font-normal',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            <span className="truncate">
                              {field.value
                                ? institutions.find(
                                    institution =>
                                      institution.id === field.value,
                                  )?.name
                                : 'Selecione uma instituição'}
                            </span>
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-72 p-0">
                        <Command>
                          <CommandInput placeholder="Procurar instituição..." />
                          <CommandEmpty>
                            Nenhuma instituição encontrada.
                          </CommandEmpty>
                          <CommandGroup>
                            {institutions.map(institution => (
                              <CommandItem
                                value={institution.name}
                                key={institution.id}
                                onSelect={() =>
                                  form.setValue('institutionId', institution.id)
                                }
                              >
                                <CheckIcon
                                  className={twMerge(
                                    'mr-2 h-4 w-4',
                                    institution.id === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                                <span className="w-full truncate">
                                  {institution.name}
                                </span>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Cargo</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={twMerge(
                              'w-72 justify-between font-normal',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            <span className="truncate">
                              {field.value
                                ? roleAlias.find(
                                    role =>
                                      role.current.toString() === field.value,
                                  )?.name
                                : 'Selecione um cargo'}
                            </span>
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-72 p-0">
                        <Command>
                          <CommandInput placeholder="Procurar cargo..." />
                          <CommandEmpty>Nenhum cargo encontrado.</CommandEmpty>
                          <CommandGroup>
                            {roleAlias.map(role => (
                              <CommandItem
                                value={role.name}
                                key={role.current}
                                onSelect={() =>
                                  form.setValue('role', role.current)
                                }
                              >
                                <CheckIcon
                                  className={twMerge(
                                    'mr-2 h-4 w-4',
                                    role.current === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                                <span className="w-full truncate">
                                  {role.name}
                                </span>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Convidar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
