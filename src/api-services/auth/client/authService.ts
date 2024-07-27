// authService.ts
import {
    Buddy,
    ErrorResponse,
    LogInData,
    PartialBuddy,
} from '@/types/Auth.types';
import fetchWrapper from '@/utils/api/fetchWrapper';
import { OAuthResponse } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

// 서버쪽 fetch 함수들은 분리할 것

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
        await fetchWrapper<void>(url, {
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
): Promise<OAuthResponse['data']> {
    const url = `/api/auth/provider?provider=${provider}`;
    try {
        const data = await fetchWrapper<OAuthResponse['data']>(url, {
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
        const data = await fetchWrapper<Buddy | ErrorResponse>(url, {
            method: 'GET',
            next: { tags: ['buddy'] },
        });
        if ('error' in data) {
            if (data.error === 'Auth session missing!') {
                return null;
            }
            return null;
        }
        return data as Buddy;
    } catch (error: any) {
        if (error.message === 'Auth session missing!') {
            return null; // 에러를 throw 하지 않고 null 반환하는 것이 올바른 방법인지 확인해보기
        }
        throw error;
    }
}

export async function postSendingResetEmail(email: string): Promise<void> {
    const url = '/api/auth/recover-redirect';
    try {
        await fetchWrapper<void>(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
    } catch (error: any) {
        throw error;
    }
}

export async function patchResetPassword(password: string): Promise<Buddy> {
    const url = '/api/auth/recover';
    try {
        const data = await fetchWrapper<Buddy>(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password }),
        });
        return data;
    } catch (error: any) {
        throw error;
    }
}
