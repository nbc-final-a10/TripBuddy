import { PUBLIC_URL } from '@/constants/common.constants';

export async function getLogInWithProvider(provider: string) {
    const response = await fetch(
        `${PUBLIC_URL}/api/auth/provider?provider=${provider}`,
    );
    if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error);
    }
    const data = await response.json();

    const buddy = data.buddy;

    return buddy;
}
