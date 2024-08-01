import { Tables } from './supabase';

export type Trip = Tables<'trips'>;

export type PartialTrip = Partial<Trip>;
