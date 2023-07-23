import { FormSchema } from '.';

interface InputProps {
  name: string;
  description: string;
  type: keyof FormSchema;
  placeholder: string;
}

export interface FormProps {
  title: string;
  inputs: InputProps[];
}
