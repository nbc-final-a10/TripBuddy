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
        const error = await response.json();

        if (error.error === 'Auth session missing!') {
            return null;
        }
        throw new Error(error.error);
    }

    const data: { buddy: Buddy } = await response.json();

    // console.log('client buddy ====>', data);

    const buddy = data.buddy;

    return buddy;
}
