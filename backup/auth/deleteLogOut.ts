import { PUBLIC_URL } from '@/constants/common.constants';

export async function deleteLogOut() {
    const response = await fetch(`${PUBLIC_URL}/api/auth/logout`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        const { message } = await response.json();

        throw new Error(message);
    }

    const data = await response.json();

    const message = data.message;

    return message;
}
