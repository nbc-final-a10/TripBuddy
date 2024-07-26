'use client';

import { PUBLIC_URL } from '@/constants/common.constants';
import { QUERY_KEY_BUDDY } from '@/constants/query.constants';
import { useBuddyQuery, useLogInMutation } from '@/hooks/auth.hooks';
import { Buddy } from '@/types/Auth.types';
import { showAlert } from '@/utils/ui/openCustomAlert';
import { Provider } from '@supabase/supabase-js';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, createContext, useEffect, useState } from 'react';
// interface AuthProviderProps {
//     initialBuddy: Buddy | null;
// }

export type AuthContextValue = {
    isLoggedIn: boolean;
    isPending: boolean;
    buddy: Buddy | null;
    logIn: (email: string, password: string) => void;
    logOut: () => void;
    signUp: (email: string, password: string) => void;
    loginWithProvider: (provider: Provider) => void;
    resetPassword: (password: string) => void;
    sendingResetEmail: (email: string) => void;
};

const initialValue: AuthContextValue = {
    isLoggedIn: false,
    isPending: false,
    buddy: null,
    logIn: () => {},
    logOut: () => {},
    signUp: () => {},
    loginWithProvider: () => {},
    resetPassword: () => {},
    sendingResetEmail: () => {},
};

//PropsWithChildren<AuthProviderProps>

export const AuthContext = createContext<AuthContextValue>(initialValue);

export function AuthProvider({
    children,
    // initialBuddy,
}: PropsWithChildren) {
    const [isPending, setIsPending] = useState<boolean>(false);

    const { data: buddy, isPending: isBuddyPending, error } = useBuddyQuery();

    const { mutateAsync: logInMutation, isPending: isLogInPending } =
        useLogInMutation();

    const isLoggedIn = !!buddy;

    const router = useRouter();
    const queryClient = useQueryClient();

    const logIn: AuthContextValue['logIn'] = async (email, password) => {
        if (buddy) return showAlert('caution', '이미 로그인 되어 있어요');

        try {
            const payload = { email, password };
            const buddy = await logInMutation(payload);

            showAlert('success', `${buddy.buddy_nickname}님 환영합니다!`, {
                onConfirm: () => router.replace('/'),
            });
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error ? error.message : 'Unknown error';
            if (errorMessage === 'Invalid login credentials') {
                return showAlert('caution', '이메일, 비밀번호를 확인해주세요.');
            }
            return showAlert('caution', errorMessage);
        }
    };

    const logOut: AuthContextValue['logOut'] = async () => {
        if (!buddy) return showAlert('caution', '로그인하고 눌러주세요');

        try {
            const response = await fetch(`${PUBLIC_URL}/api/auth/logout`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('fetch 실패');
            }
        } catch (error) {
            console.error(error);
        }
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY_BUDDY] });
        router.replace('/login');
    };

    const signUp: AuthContextValue['signUp'] = async (email, password) => {
        if (buddy) return showAlert('caution', '이미 로그인 되어 있어요');

        try {
            const payload = { email, password };
            const response = await fetch(`${PUBLIC_URL}/api/auth/signup`, {
                method: 'POST',
                body: JSON.stringify(payload),
            });
            const data = await response.json();

            if (!response.ok) {
                if (data.error === 'User already registered')
                    return showAlert('caution', '이미 가입된 이메일입니다!');
            }

            if (data.buddy) {
                queryClient.invalidateQueries({ queryKey: [QUERY_KEY_BUDDY] });
                showAlert('success', '회원가입 성공!', {
                    onConfirm: () => router.replace('/'),
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const loginWithProvider: AuthContextValue['loginWithProvider'] =
        async provider => {
            try {
                const response = await fetch(
                    `${PUBLIC_URL}/api/auth/provider?provider=${provider}`,
                );
                if (!response.ok) {
                    throw new Error('fetch 실패');
                }
                const data = await response.json();

                // queryClient.invalidateQueries({ queryKey: [QUERY_KEY_USER] });
                showAlert('success', '소셜 로그인을 진행합니다', {
                    onConfirm: () => router.replace(data.url),
                });
            } catch (error) {
                console.error(error);
            }
        };

    const sendingResetEmail: AuthContextValue['sendingResetEmail'] = async (
        email: string,
    ) => {
        try {
            const response = await fetch(
                `${PUBLIC_URL}/api/auth/recover-redirect`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                },
            );

            if (!response.ok) {
                throw new Error('fetch 실패');
            }
            return showAlert('success', '이메일 전송 성공!', {
                onConfirm: () => router.replace('/login'),
            });
        } catch (error) {
            console.error(error);
        }
    };

    const resetPassword: AuthContextValue['resetPassword'] = async (
        password: string,
    ) => {
        try {
            const response = await fetch(`${PUBLIC_URL}/api/auth/recover`, {
                method: 'POST',
                body: JSON.stringify({ password }),
            });
            const data = await response.json();
            if (
                data.error ===
                'New password should be different from the old password.'
            ) {
                return showAlert('caution', '기존 비밀번호와 동일합니다!');
            } else {
                queryClient.invalidateQueries({ queryKey: [QUERY_KEY_BUDDY] });
                return showAlert('success', '비밀번호 변경 성공!', {
                    onConfirm: () => router.replace('/'),
                });
            }
        } catch (error) {
            console.error(error);
            router.refresh();
        }
    };

    useEffect(() => {
        console.log('isPending ====>', isPending);
    }, [isPending]);

    useEffect(() => {
        setIsPending(isBuddyPending || isLogInPending);
    }, [isBuddyPending, isLogInPending]);

    useEffect(() => {
        console.log('buddy ====>', buddy);
    }, [buddy]);

    useEffect(() => {
        if (error) showAlert('error', error.message);
    }, [error]);

    const value: AuthContextValue = {
        isLoggedIn,
        isPending,
        buddy: buddy ?? null,
        logIn,
        logOut,
        signUp,
        loginWithProvider,
        resetPassword,
        sendingResetEmail,
        // setMeClient,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
