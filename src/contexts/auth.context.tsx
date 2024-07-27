'use client';

import { deleteLogOut } from '../../backup/auth/deleteLogOut';
import { PUBLIC_URL } from '@/constants/common.constants';
import { QUERY_KEY_BUDDY } from '@/constants/query.constants';
import {
    useBuddyQuery,
    useLogInMutation,
    useSignUpMutation,
} from '@/hooks/auth.hooks';
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

    const { mutateAsync: signUpMutation, isPending: isSignUpPending } =
        useSignUpMutation();

    const router = useRouter();
    const queryClient = useQueryClient();

    const logIn: AuthContextValue['logIn'] = async (email, password) => {
        if (buddy) return showAlert('caution', '이미 로그인 되어 있어요');

        try {
            const payload = { email, password };
            const buddy = await logInMutation(payload);

            if (!buddy)
                return showAlert('caution', '알 수 없는 오류가 발생했어요');

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
            await deleteLogOut();
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : 'Unknown error';
            return showAlert('error', errorMessage);
        }
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY_BUDDY] });
        router.replace('/login');
    };

    const signUp: AuthContextValue['signUp'] = async (email, password) => {
        if (buddy) return showAlert('caution', '이미 로그인 되어 있어요');

        try {
            const payload = { email, password };
            const buddy = await signUpMutation(payload);

            if (!buddy)
                return showAlert('caution', '알 수 없는 오류가 발생했어요');

            showAlert(
                'success',
                `회원가입 성공 ${buddy.buddy_email}님 환영합니다!`,
                {
                    onConfirm: () => router.replace('/'),
                },
            );
        } catch (error) {
            console.error(error);
            const errorMessage =
                error instanceof Error ? error.message : 'Unknown error';
            if (errorMessage === 'User already registered') {
                return showAlert('caution', '이미 가입된 이메일입니다!');
            }
            return showAlert('caution', errorMessage);
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
        setIsPending(isBuddyPending || isLogInPending || isSignUpPending);
    }, [isBuddyPending, isLogInPending, isSignUpPending]);

    useEffect(() => {
        console.log('buddy ====>', buddy);
    }, [buddy]);

    useEffect(() => {
        if (error) showAlert('error', error.message);
    }, [error]);

    const value: AuthContextValue = {
        isLoggedIn: !!buddy,
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
