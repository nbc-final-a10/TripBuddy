import { PUBLIC_URL } from '@/constants/common.constants';
import { Buddy } from '@/types/Auth.types';
import { cookies } from 'next/headers';

export async function getBuddyServer(): Promise<any | null> {
    const cookieStore = cookies();
    const cookiesArray = cookieStore.getAll();

    if (cookiesArray.length === 0) {
        return null;
    }

    const response = await fetch(`${PUBLIC_URL}/api/auth/buddy`, {
        method: 'GET',
        next: {
            tags: ['buddy'],
        },
        // cache: "no-store",
        headers: {
            Cookie: cookiesArray
                .map(cookie => `${cookie.name}=${cookie.value}`)
                .join(';'),
        },
    });

    if (!response.ok) {
        const error = await response.json();

        if (error.error === 'Auth session missing!') {
            return null;
        }
        throw new Error(error.error);
    }

    const data: { buddy: Buddy } = await response.json();

    // console.log('server buddy ====>', data);

    const buddy = data.buddy;

    return buddy;
}
