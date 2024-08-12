import { Contract } from './Contract.types';
import { Tables } from './supabase';

export type Trip = Tables<'trips'>;

export type PartialTrip = Partial<Trip>;

export type TripWithContract = Trip & {
    // contract: Contract |Contract[];
    contract: Contract[];
};

export type TripInfiniteQueryResponse = {
    trips: TripWithContract[];
    allTrips?: TripWithContract[][];
    totalItems: number;
    totalPages: number;
    currentPage: number;
};

export type BookMark = Tables<'tripbookmarks'>;

export type PartialBookMark = Partial<BookMark>;

export type BookMarkRequest = PartialBookMark & {
    is_bookmarked: boolean;
};
