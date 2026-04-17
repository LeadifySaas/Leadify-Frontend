import type { SedeFormValues } from '../schemas';

export interface Sede extends SedeFormValues {
    id: number;
}

export interface SedeDto extends Omit<Sede, 'id'> { }