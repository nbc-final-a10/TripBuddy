import { PUBLIC_URL } from '@/constants/common.constants';
import { useCallback, useEffect, useState } from 'react';

// 클라이언트 측 코드임
const useNaverInit = () => {
    const [naverLogin, setNaverLogin] = useState(null);

    const handleNaverInit = useCallback(() => {
        const naver = window.naver;

        const naverLogin = new naver.LoginWithNaverId({
            clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID, //ClientID
            callbackUrl: `${PUBLIC_URL}/api/auth/callback/naver`, // Callback URL
            callbackHandle: true,
            isPopup: false, // 팝업 형태로 인증 여부
            loginButton: {
                color: 'green', // 색상
                type: 1, // 버튼 크기
                height: '60', // 버튼 높이
            }, // 로그인 버튼 설정
        });
        naverLogin.init();

        return naverLogin;
    }, []);

    useEffect(() => {
        const naverLogin = handleNaverInit();

        setNaverLogin(naverLogin);
    }, [handleNaverInit]);

    if (!naverLogin) return { naverLogin: null };

    return { naverLogin };
};

export default useNaverInit;
