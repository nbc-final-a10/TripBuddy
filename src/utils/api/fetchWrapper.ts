import { PUBLIC_URL } from '@/constants/common.constants';

async function fetchWrapper(url: string, options: RequestInit) {
    const response = await fetch(`${PUBLIC_URL}${url}`, options);
    if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error);
    }
    return response.json();
}
