// authService.ts
import { Buddy, LogInData, PartialBuddy } from '@/types/Auth.types';
import fetchWrapper from '@/utils/api/fetchWrapper';
import { OAuthResponse } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export async function postLogIn(payload: LogInData): Promise<Buddy> {
    const url = `/api/auth/login`;
    try {
        const data = await fetchWrapper<Buddy>(url, {
            method: 'POST',
            body: JSON.stringify(payload),
        });
        return data;
    } catch (error: any) {
        throw error;
    }
}

export async function deleteLogOut(): Promise<void> {
    const url = `/api/auth/logout`;
    try {
        await fetchWrapper(url, {
            method: 'DELETE',
        });
    } catch (error: any) {
        throw error;
    }
}

export async function postSignUp(payload: LogInData): Promise<Buddy> {
    const url = `/api/auth/signup`;
    try {
        const data = await fetchWrapper<Buddy>(url, {
            method: 'POST',
            body: JSON.stringify(payload),
        });
        return data;
    } catch (error: any) {
        throw error;
    }
}

export async function getLogInWithProvider(
    provider: string,
): Promise<OAuthResponse> {
    const url = `/api/auth/provider?provider=${provider}`;
    try {
        const data = await fetchWrapper<OAuthResponse>(url, {
            method: 'GET',
        });
        return data;
    } catch (error: any) {
        throw error;
    }
}

export async function patchBuddyInfo(buddyInfo: PartialBuddy): Promise<Buddy> {
    const url = `/api/auth/buddy`;
    try {
        const data = await fetchWrapper<Buddy>(url, {
            method: 'PATCH',
            body: JSON.stringify({ buddyInfo }),
            headers: {
                'Content-Type': 'application/json',
            },
            next: { tags: ['buddy'] },
        });
        return data;
    } catch (error: any) {
        throw error;
    }
}

export async function getBuddyClient(): Promise<Buddy | null> {
    const url = `/api/auth/buddy`;
    try {
        const data = await fetchWrapper<Buddy>(url, {
            method: 'GET',
            next: { tags: ['buddy'] },
        });
        return data;
    } catch (error: any) {
        if (error.message === 'Auth session missing!') {
            return null; // 에러를 throw 하지 않고 null 반환하는 것이 올바른 방법인지 확인해보기
        }
        throw error;
    }
}

export async function getBuddyServer(): Promise<Buddy | null> {
    const cookieStore = cookies();
    const cookiesArray = cookieStore.getAll();

    if (cookiesArray.length === 0) {
        return null;
    }

    const url = `/api/auth/buddy`;
    try {
        const data = await fetchWrapper<Buddy>(url, {
            method: 'GET',
            cache: 'no-store',
            headers: {
                Cookie: cookiesArray
                    .map(cookie => `${cookie.name}=${cookie.value}`)
                    .join(';'),
            },
            next: { tags: ['buddy'] },
        });
        return data;
    } catch (error: any) {
        if (error.message === 'Auth session missing!') {
            return null; // 에러를 throw 하지 않고 null 반환하는 것이 올바른 방법인지 확인해보기
        }
        throw error;
    }
}
