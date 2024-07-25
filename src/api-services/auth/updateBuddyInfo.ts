import { PUBLIC_URL } from '@/constants/common.constants';
import { type PartialBuddy } from '@/types/Auth.types';

export async function updateBuddyInfo(buddyInfo: PartialBuddy) {
    const response = await fetch(`${PUBLIC_URL}/api/auth/buddy`, {
        method: 'PATCH',
        body: JSON.stringify({ buddyInfo }),
        next: {
            tags: ['buddy'],
        },
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error);
    }
    const data = await response.json();

    return data;
}
