import { PUBLIC_URL } from '@/constants/common.constants';
import { type Buddy, type LogInData } from '@/types/Auth.types';

export async function postLogIn(payload: LogInData): Promise<Buddy | null> {
    const response = await fetch(`${PUBLIC_URL}/api/auth/login`, {
        method: 'POST',
        body: JSON.stringify(payload),
    });
    if (!response.ok) {
        const { error } = await response.json();

        if (error) throw new Error(error);
        return null;
    }

    const data = await response.json();

    const buddy = data.buddy;

    return buddy;
}
