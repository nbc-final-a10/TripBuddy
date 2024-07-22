import { PUBLIC_URL } from '@/constants/common.constants';
import { Buddy } from '@/types/Auth.types';

export async function getUserClient(
    initialBuddy: Buddy,
): Promise<Buddy | null> {
    const response = await fetch(`${PUBLIC_URL}/api/auth/buddy`, {
        method: 'GET',
        next: {
            tags: ['user'],
        },
        // cache: "no-store",
    });

    if (!response.ok) {
        return initialBuddy;
    }

    const data = await response.json();

    const buddy = data.user;

    return buddy;
}
