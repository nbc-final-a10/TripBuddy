import { PUBLIC_URL } from '@/constants/common.constants';

async function fetchWrapper<T>(url: string, options: RequestInit): Promise<T> {
    const response = await fetch(`${PUBLIC_URL}${url}`, options);
    if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error);
    }
    return response.json();
}

export default fetchWrapper;
