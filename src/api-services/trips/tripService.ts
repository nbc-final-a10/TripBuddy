import { TripWithContract } from '@/types/Trips.types';
import fetchWrapper from '@/utils/api/fetchWrapper';

export async function getTrips(): Promise<TripWithContract[]> {
    const url = `/api/trips`;
    try {
        const data = await fetchWrapper<TripWithContract[]>(url, {
            method: 'GET',
            cache: 'no-store',
        });
        return data;
    } catch (error: any) {
        throw error;
    }
}

export async function getTrip(id: string): Promise<TripWithContract> {
    const url = `/api/trips/${id}`;
    try {
        const data = await fetchWrapper<TripWithContract>(url, {
            method: 'GET',
            cache: 'no-store',
        });
        return data;
    } catch (error: any) {
        throw error;
    }
}
