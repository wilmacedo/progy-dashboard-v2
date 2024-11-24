'use client';

import { DatePickerWithRange } from '@/components/date-picker';
import { Button } from '@/components/ui/button';
import { Activity, Initiative, Planning, State } from '@/types/request';
import { User } from '@/types/requests';
import { capitalize } from '@/utils/capitalize';
import { getTimeSince } from '@/utils/get-time-since';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronRight, Download, Layers, Paperclip } from 'lucide-react';
import Link from 'next/link';
import { FocusEvent, KeyboardEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { DropdownSelector } from './dropdown-selector';

const activitySchema = z.object({
  name: z.string(),
  state_id: z.number().positive(),
  initiative_id: z.number().positive(),
  value: z.string().nullable(),
  responsible: z.string().or(z.number()),
  comments: z.string().nullable(),
  date_start: z.string(),
  date_end: z.string(),
});

type ActivityValues = z.infer<typeof activitySchema>;

interface ActivityFormProps {
  planning: Planning;
  activity: Activity;
  states: State[];
  initiatives: Initiative[];
  users: User[];
}

interface EditableField {
  [key: string]: boolean;
}

type ItemValues = Partial<{
  id: number;
  name: string;
}>;

export function ActivityForm({
  planning,
  activity,
  states,
  initiatives,
  users,
}: ActivityFormProps) {
  const [editableField, setEditableField] = useState<EditableField>({});

  const form = useForm<ActivityValues>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      name: activity.name,
      state_id: activity.state_id,
      initiative_id: activity.initiative_id,
      value: activity.value,
      responsible: activity.responsible,
      comments: activity.comments,
      date_start: activity.date_start,
      date_end: activity.date_end,
    },
  });

  useEffect(() => {
    if (Object.keys(editableField).length === 0) return;

    for (const [key, value] of Object.entries(editableField)) {
      const element = document.querySelector(
        `[name="${key}"]`,
      ) as HTMLTextAreaElement;
      if (!element) continue;

      value ? element.focus() : element.blur();
    }
  }, [editableField]);

  function handleEditable(field: string) {
    setEditableField(prev => ({
      ...prev,
      [field]: prev[field] ? !prev[field] : true,
    }));
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLTextAreaElement>,
    field: string,
  ) {
    const { code } = event;
    if (!code || !['Enter', 'Escape'].includes(code)) return;

    handleEditable(field);
  }

  function handleFocus(event: FocusEvent<HTMLTextAreaElement, Element>) {
    const value = event.target.value;
    event.target.setSelectionRange(value.length, value.length);
  }

  function formatAmount(value: string | null) {
    if (value === null) {
      return null;
    }

    let amount = Number(value);
    if (isNaN(amount)) {
      amount = 0;
    }

    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    });

    return formatter.format(amount);
  }

  function handleSubmit(data: ActivityValues) {
    console.log(data);
  }

  function handleSelect(field: keyof ActivityValues, id: number) {
    form.setValue(field, id, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }

  function findItemName(list: ItemValues[], id: number) {
    const item = list.find(item => item.id === id);
    if (!item) {
      return 'N/A';
    }

    return item.name;
  }

  function findUserId(name: string | number) {
    if (typeof name === 'number') {
      return 0;
    }

    const user = users.find(
      user => user.name.toLowerCase() === name.toLowerCase(),
    );
    if (!user) {
      return 0;
    }

    return user.id;
  }

  function findUserName(id: string | number) {
    if (typeof id === 'string') {
      return activity.responsible;
    }

    const user = users.find(user => user.id === id);
    if (!user) {
      return activity.responsible;
    }

    return user.name;
  }

  function hasEmptyComments() {
    const comments = form.watch('comments');
    if (comments === null || comments === undefined) return true;

    return comments.length === 0;
  }

  return (
    <form className="space-y-8" onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            href={`/project/${planning.id}/activities`}
            className="group text-muted-foreground hover:underline hover:text-foreground"
          >
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4" />
              <span className="text-sm">Atividades</span>
            </div>
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="max-w-[10rem] truncate capitalize text-sm">
            {capitalize(activity.name)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Paperclip className="mr-2 w-4 h-4" />
            Anexar
          </Button>
          <Button variant="outline" size="sm" disabled={!!!activity.file}>
            <Download className="mr-2 w-4 h-4" />
            Baixar
          </Button>
          <Button
            disabled={!form.formState.isValid || !form.formState.isDirty}
            size="sm"
          >
            Salvar
          </Button>
        </div>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <div
            data-editable={!!editableField['name']}
            className="group relative"
          >
            <h1
              className="text-3xl font-semibold opacity-0 invisible group-data-[editable=false]:opacity-100 group-data-[editable=false]:visible"
              onClick={() => handleEditable('name')}
            >
              {form.getValues('name')}
            </h1>
            <textarea
              id="name"
              defaultValue={activity.name}
              className="absolute top-0 left-0 w-full h-full text-3xl font-semibold resize-none group-data-[editable=false]:opacity-0 group-data-[editable=false]:invisible"
              onKeyDown={event => handleKeyDown(event, 'name')}
              onFocus={handleFocus}
              {...form.register('name', {
                onBlur: () => handleEditable('name'),
              })}
            />
          </div>
          <span className="text-xs text-muted-foreground">
            Criado{' '}
            {format(
              new Date(activity.created_at),
              "cc 'de' LLLL 'de' YYY k:mm",
              {
                locale: ptBR,
              },
            )}{' '}
            · Atualizado {getTimeSince(new Date(activity.updated_at))} atras
          </span>
        </div>
      </div>

      <div className="h-full flex gap-2">
        <div className="pr-8 mr-8 flex flex-col space-y-2 max-w-[17.5rem] border-r border-r-border">
          <div className="my-2 flex items-center gap-2">
            <span className="text-muted-foreground text-sm min-w-[7rem]">
              Estado
            </span>
            <DropdownSelector
              placeholder="Encontrar estado"
              emptyText="Nenhum estado encontrado."
              selectedId={form.watch('state_id')}
              list={states}
              onSelect={id => handleSelect('state_id', id)}
            >
              <button className="truncate w-fit px-1.5 py-1 text-sm bg-muted-foreground/10 text-muted-foreground rounded-lg hover:brightness-125">
                <span>
                  {capitalize(findItemName(states, form.watch('state_id')))}
                </span>
              </button>
            </DropdownSelector>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm min-w-[7rem]">
              Responsável
            </span>
            <DropdownSelector
              placeholder="Encontrar usuário"
              emptyText="Nenhum usuário encontrado"
              selectedId={findUserId(form.watch('responsible'))}
              list={users.map(user => ({
                id: user.id,
                name: user.name,
              }))}
              onSelect={id => handleSelect('responsible', id)}
            >
              <Button
                size="sm"
                className="block px-1.5 py-1 truncate font-normal"
                variant="ghost"
              >
                {capitalize(findUserName(form.watch('responsible')))}
              </Button>
            </DropdownSelector>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm min-w-[7rem]">
              Iniciativa
            </span>
            <DropdownSelector
              placeholder="Encontrar iniciativa"
              emptyText="Nenhuma iniciativa encontrada"
              selectedId={form.watch('initiative_id')}
              list={initiatives.map(initiative => ({
                id: initiative.id,
                name: initiative.name,
              }))}
              onSelect={id => handleSelect('initiative_id', id)}
            >
              <Button
                size="sm"
                className="block px-1.5 py-1 truncate font-normal"
                variant="ghost"
              >
                {capitalize(
                  findItemName(initiatives, form.watch('initiative_id')),
                )}
              </Button>
            </DropdownSelector>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm min-w-[7rem]">
              Valor
            </span>
            <Button
              size="sm"
              data-empty={activity.value !== null}
              className="block px-1.5 py-1 truncate font-normal data-[empty=false]:text-muted-foreground"
              variant="ghost"
            >
              {activity.value !== null ? formatAmount(activity.value) : 'N/A'}
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold">Período</h3>

          <DatePickerWithRange
            range={{
              from: new Date(activity.date_start),
              to: new Date(activity.date_end),
            }}
            onPick={range => {}}
          />

          <h3 className="mt-4 text-xl font-semibold">Comentário</h3>

          <div
            data-editable={!!editableField['comments']}
            className="group relative"
          >
            <span
              data-empty={hasEmptyComments()}
              className="data-[empty=true]:text-sm data-[empty=true]:text-muted-foreground opacity-0 invisible group-data-[editable=false]:opacity-100 group-data-[editable=false]:visible"
              onClick={() => handleEditable('comments')}
            >
              {form.getValues('comments') || 'Nenhum comentário fixado'}
            </span>
            <textarea
              id="comments"
              defaultValue={activity.comments || ''}
              className="absolute top-0 left-0 w-full h-full resize-none group-data-[editable=false]:opacity-0 group-data-[editable=false]:invisible"
              onKeyDown={event => handleKeyDown(event, 'comments')}
              onFocus={handleFocus}
              {...form.register('comments', {
                onBlur: () => handleEditable('comments'),
              })}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
