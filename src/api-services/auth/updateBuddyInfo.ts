import { PUBLIC_URL } from '@/constants/common.constants';
import { type PartialBuddy } from '@/types/Auth.types';

export async function updateBuddyInfo(buddyInfo: PartialBuddy) {
    const response = await fetch(`${PUBLIC_URL}/api/auth/buddy`, {
        method: 'POST',
        body: JSON.stringify({ buddyInfo }),
        next: {
            tags: ['buddy'],
        },
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        return null;
    }
    const data = await response.json();

    return data;
}
