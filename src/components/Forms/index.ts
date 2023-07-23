import { CompanyForm } from './Company/Form';
import { CompanyFormData, companyFormSchema } from './Company/schema';
import { GoalForm } from './Goals/Form';
import { GoalFormData, goalsSchema } from './Goals/schema';

export const forms = [CompanyForm, GoalForm];
export const formSchemas = [companyFormSchema, goalsSchema];

export type FormSchema = Partial<CompanyFormData & GoalFormData>;
