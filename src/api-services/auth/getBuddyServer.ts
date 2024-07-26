import { PUBLIC_URL } from '@/constants/common.constants';
import { Buddy } from '@/types/Auth.types';
import { cookies } from 'next/headers';

export async function getBuddyServer(): Promise<any | null> {
    const cookieStore = cookies();
    const cookiesArray = cookieStore.getAll();

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

        const message = error.data.buddy;
        if (message === 'Auth session missing!') {
            return null;
        }
        return null;
    }

    const data: { buddy: Buddy } = await response.json();

    const buddy = data.buddy;

    return buddy;
}
