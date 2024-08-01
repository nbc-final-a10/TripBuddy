import { Trip } from '@/types/Trips.types';
import fetchWrapper from '@/utils/api/fetchWrapper';

export async function getTrips(): Promise<Trip[]> {
    const url = `/api/trips`;
    try {
        const data = await fetchWrapper<Trip[]>(url, {
            method: 'GET',
            cache: 'no-store',
        });
        return data;
    } catch (error: any) {
        throw error;
    }
}

export async function getTrip(id: string): Promise<Trip> {
    const url = `/api/trips/${id}`;
    try {
        const data = await fetchWrapper<Trip>(url, {
            method: 'GET',
            cache: 'no-store',
        });
        return data;
    } catch (error: any) {
        throw error;
    }
}
