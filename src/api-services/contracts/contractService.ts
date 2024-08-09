import { BannerTripWithContract } from '@/types/Contract.types';
import fetchWrapper from '@/utils/api/fetchWrapper';

export async function getBannerTrips(
    buddyId: string | undefined,
): Promise<BannerTripWithContract | null> {
    if (!buddyId) return null;
    const url = `/api/contract/${buddyId}`;
    try {
        const data = await fetchWrapper<BannerTripWithContract>(url, {
            method: 'GET',
            cache: 'no-store',
        });
        return data;
    } catch (error: any) {
        throw error;
    }
}
