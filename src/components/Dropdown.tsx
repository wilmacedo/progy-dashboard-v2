'use client';

import Select, { ActionMeta, SingleValue } from 'react-select';

export interface DropdownData {
  value: number;
  label: string;
}

interface DropdownProps {
  className?: string;
  emptyMessage?: string;
  options?: DropdownData[];
  placeholder?: string;
  form?: string;
  onChange?: (
    newValue: SingleValue<DropdownData>,
    actionMeta: ActionMeta<DropdownData>,
  ) => void;
}

export default function Dropdown({ emptyMessage, ...rest }: DropdownProps) {
  return (
    <Select
      noOptionsMessage={() => emptyMessage}
      styles={{
        control: base => ({
          ...base,
          borderColor: '#E2E4E3',

          ':hover': {
            backgroundColor: '#E7E9ED',
            borderColor: '#E2E4E3',
            cursor: 'text',
          },

          ':focus-within': {
            boxShadow: '0 0 0 2px #3E6BF7',
          },
        }),
        placeholder: base => ({
          ...base,
          color: '#9DA2AE',
          fontSize: '0.875rem',
          lineHeight: '1.25rem',
        }),
        option: base => ({
          ...base,
          fontSize: '.875rem',
          lineHeight: '1.25rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',

          ':hover': {
            cursor: 'pointer',
          },
        }),
        indicatorSeparator: () => ({}),
        dropdownIndicator: base => ({
          ...base,
          ':hover': {
            cursor: 'pointer',
            color: '#121212',
          },
        }),
      }}
      {...rest}
    />
  );
}
