import { Trip } from './Trips.types';
import { Tables } from './supabase';

export type Contract = Tables<'contract'>;

export type PartialContract = Partial<Contract>;

export type ContractWithTrips = Contract & {
    trips: Trip;
};
