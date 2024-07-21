'use client';

import { PUBLIC_URL } from '@/constants/common.constant';
import { QUERY_KEY_USER } from '@/constants/query.constants';
import { useBuddyQuery } from '@/hooks/auth.hooks';
import { showAlert } from '@/utils/ui/openCustomAlert';
import { Provider } from '@supabase/supabase-js';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, createContext } from 'react';

// export const useAuth = () => useContext(AuthContext);

// interface AuthProviderProps {
//     initialMe?: Me | undefined;
// }

export type AuthContextValue = {
    isLoggedIn: boolean;
    isPending: boolean;
    buddy: any | null;
    logIn: (email: string, password: string) => void;
    logOut: () => void;
    signUp: (name: string, email: string, password: string) => void;
    loginWithProvider: (provider: Provider) => void;
    resetPassword: (password: string) => void;
    sendingResetEmail: (email: string) => void;
    // setMeClient: (me: Me | null) => void;
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
    // setMeClient: () => {},
};

export const AuthContext = createContext<AuthContextValue>(initialValue);

export function AuthProvider({
    children,
    initialBuddy,
}: PropsWithChildren<any>) {
    // 이니셜 버디를 쿼리에 주입하므로, 초기 버디 값이 있는지 주의깊게 추적 필요
    const { data: buddy, isPending, error } = useBuddyQuery(initialBuddy);

    const isLoggedIn = !!buddy;

    const router = useRouter();
    const queryClient = useQueryClient();

    // console.log("isPending ====>", userIsPending);

    const logIn: AuthContextValue['logIn'] = async (email, password) => {
        if (buddy?.userTableInfo)
            return showAlert('caution', '이미 로그인 되어 있어요');
        if (!email || !password)
            return showAlert('caution', '이메일, 비밀번호 모두 채워 주세요.');

        try {
            const data = { email, password };
            const response = await fetch(`${PUBLIC_URL}/api/auth/login`, {
                method: 'POST',
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('fetch 실패');
            }
            const { error } = await response.json();

            if (error) {
                if (error === 'Invalid login credentials') {
                    return showAlert(
                        'caution',
                        '이메일, 비밀번호를 확인해주세요.',
                    );
                }
                return showAlert('caution', error);
            }

            queryClient.invalidateQueries({ queryKey: [QUERY_KEY_USER] });
            showAlert('success', '로그인 성공!', () => router.replace('/'));
        } catch (error) {
            console.error(error);
        }
    };

    const logOut = async () => {
        if (!buddy?.userTableInfo)
            return showAlert('caution', '로그인하고 눌러주세요');

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
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY_USER] });
        router.replace('/login');
    };

    const signUp: AuthContextValue['signUp'] = async (
        name,
        email,
        password,
    ) => {
        if (buddy?.userTableInfo)
            return showAlert('caution', '이미 로그인 되어 있어요');

        try {
            const payload = { name, email, password };
            const response = await fetch(`${PUBLIC_URL}/api/auth/signup`, {
                method: 'POST',
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                throw new Error('fetch 실패');
            }
            const data = await response.json();

            if (data.user) {
                queryClient.invalidateQueries({ queryKey: [QUERY_KEY_USER] });
                showAlert('success', '회원가입 성공!', () =>
                    router.replace('/'),
                );
            } else {
                console.error(data.error);
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

                queryClient.invalidateQueries({ queryKey: [QUERY_KEY_USER] });
                router.replace(data.url);
                showAlert('success', '로그인 성공');
            } catch (error) {
                console.error(error);
            }
        };

    const sendingResetEmail = async (email: string) => {
        try {
            const response = await fetch(
                `${PUBLIC_URL}/api/auth/recover-redirect`,
                {
                    method: 'POST',
                    body: JSON.stringify({ email }),
                },
            );

            if (!response.ok) {
                throw new Error('fetch 실패');
            }
            return showAlert('success', '이메일 전송 성공!', () =>
                router.replace('/login'),
            );
        } catch (error) {
            console.error(error);
        }
    };

    const resetPassword = async (password: string) => {
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
                queryClient.invalidateQueries({ queryKey: [QUERY_KEY_USER] });
                return showAlert('success', '비밀번호 변경 성공!', () =>
                    router.replace('/'),
                );
            }
        } catch (error) {
            console.error(error);
            router.refresh();
        }
    };

    // const setMeClient = (me: Me | null) => {
    //     // setMe(me);
    //     queryClient.invalidateQueries({ queryKey: ["user"] });
    // };

    // 아래는 서버사이드에서 처리하기 때문에 주석처리
    // useEffect(() => {
    //     fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/me`).then(async (response) => {
    //         if (response.status === 200) {
    //             const { data } = await response.json();
    //             setMe(data);
    //         }
    //     });
    // }, []);

    // 여기는 나중에 지우기
    // useEffect(() => {
    //     console.log("me 변경됨 ===>", me);
    // }, [me]);

    const value: AuthContextValue = {
        isLoggedIn,
        isPending,
        buddy: error ? null : (buddy?.userTableInfo as any | null),
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
