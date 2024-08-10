import {
    BannerTripWithContract,
    Contract,
    PartialContract,
} from '@/types/Contract.types';
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

export async function postContract(payload: PartialContract) {
    const url = `/api/contract`;
    try {
        const data = await fetchWrapper<Contract>(url, {
            method: 'POST',
            cache: 'no-store',
            body: JSON.stringify(payload),
        });
        return data;
    } catch (error: any) {
        throw error;
    }
}
