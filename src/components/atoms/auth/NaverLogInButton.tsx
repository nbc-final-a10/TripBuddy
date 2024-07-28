'use client';

import { PUBLIC_URL } from '@/constants/common.constants';
import React, { useCallback, useEffect, useRef } from 'react';
import { SiNaver } from 'react-icons/si';

const NaverLogInButton: React.FC = () => {
    const naverRef = useRef<HTMLButtonElement>(null);

    const handleNaverInit = useCallback(() => {
        const naver = window.naver;

        const naverLogin = new naver.LoginWithNaverId({
            clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID, //ClientID
            callbackUrl: `${PUBLIC_URL}/loading`, // Callback URL
            callbackHandle: true,
            isPopup: false, // 팝업 형태로 인증 여부
            loginButton: {
                color: 'green', // 색상
                type: 1, // 버튼 크기
                height: '60', // 버튼 높이
            }, // 로그인 버튼 설정
        });
        naverLogin.init();
    }, []);

    const handleNaverLoginClick = () => {
        if (
            !naverRef ||
            !naverRef.current ||
            !naverRef.current.children ||
            !naverRef.current.children[0].children
        )
            return;

        (naverRef.current.children[0].children[0] as HTMLImageElement).click();
    };

    useEffect(() => {
        handleNaverInit();
    }, [handleNaverInit]);

    return (
        <>
            <button ref={naverRef} id="naverIdLogin" className="hidden" />
            <SiNaver
                className="w-10 h-10 text-green-500 cursor-pointer"
                onClick={handleNaverLoginClick}
            />
        </>
    );
};

export default NaverLogInButton;
