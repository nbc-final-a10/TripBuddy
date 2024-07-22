import { PUBLIC_URL } from '@/constants/common.constants';
import { Buddy } from '@/types/Auth.types';

export async function getUserClient(): Promise<Buddy | null> {
    const response = await fetch(`${PUBLIC_URL}/api/auth/buddy`, {
        method: 'GET',
        next: {
            tags: ['user'],
        },
        // cache: "no-store",
    });

    console.log(response);

    if (!response.ok) {
        return null;
    }

    const data = await response.json();

    const buddy = data.user;

    return buddy;
}
