import { GoalForm } from './Goals/Form';
import { GoalFormData, goalsSchema } from './Goals/schema';

export const forms = [GoalForm];
export const formSchemas = [goalsSchema];

export type FormSchema = Partial<GoalFormData>;
