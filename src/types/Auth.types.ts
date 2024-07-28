import { Tables } from './supabase';

export type Buddy = Tables<'buddies'>;

export type PartialBuddy = Partial<Buddy>;
