'use client';

import useNaverInit from '@/hooks/auth/useNaverInit';
import React, { useRef } from 'react';
import { SiNaver } from 'react-icons/si';

const NaverLogInButton: React.FC = () => {
    useNaverInit();

    const naverRef = useRef<HTMLButtonElement>(null);

    const handleNaverLoginClick = () => {
        if (!naverRef || !naverRef.current || !naverRef.current.children)
            return;

        // 아래 코드는 개발자 도구를 통해 직접 분석해서 사용에 맞게 변경하셔도 좋을 것 같습니다.
        (naverRef.current.children[0] as HTMLImageElement).click();
    };

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
