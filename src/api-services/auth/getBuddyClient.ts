import { PUBLIC_URL } from '@/constants/common.constants';
import { Buddy } from '@/types/Auth.types';

export async function getBuddyClient(): Promise<Buddy | null> {
    const response = await fetch(`${PUBLIC_URL}/api/auth/buddy`, {
        method: 'GET',
        next: {
            tags: ['buddy'],
        },
        // cache: "no-store",
    });

    if (!response.ok) {
        return null;
    }

    const data: { buddy: Buddy } = await response.json();

    const buddy = data.buddy;

    return buddy;
}
