import { Notification } from '@/types/Notification.types';
import fetchWrapper from '@/utils/api/fetchWrapper';

export async function getNotifications(): Promise<Notification[]> {
    const url = `/api/notification`;
    try {
        const data = await fetchWrapper<Notification[]>(url, {
            method: 'GET',
            cache: 'no-store',
        });
        return data;
    } catch (error: any) {
        throw error;
    }
}
