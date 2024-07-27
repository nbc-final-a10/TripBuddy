import { Buddy } from '@/types/Auth.types';
import fetchWrapper from '@/utils/api/fetchWrapper';
import { cookies } from 'next/headers';

export async function getBuddyServer(): Promise<Buddy | null> {
    const cookieStore = cookies();
    const cookiesArray = cookieStore.getAll();

    if (cookiesArray.length === 0) {
        return null;
    }

    const url = `/api/auth/buddy`;
    try {
        const data = await fetchWrapper<Buddy>(url, {
            method: 'GET',
            cache: 'no-store',
            headers: {
                Cookie: cookiesArray
                    .map(cookie => `${cookie.name}=${cookie.value}`)
                    .join(';'),
            },
            next: { tags: ['buddy'] },
        });
        return data;
    } catch (error: any) {
        if (error.message === 'Auth session missing!') {
            return null; // 에러를 throw 하지 않고 null 반환하는 것이 올바른 방법인지 확인해보기
        }
        throw error;
    }
}
