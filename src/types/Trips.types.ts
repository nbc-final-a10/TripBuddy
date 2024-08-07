import { Contract } from './Contract.types';
import { Tables } from './supabase';

export type Trip = Tables<'trips'>;

export type PartialTrip = Partial<Trip>;

export type TripWithContract = Trip & {
    contract: Contract | Contract[];
};
