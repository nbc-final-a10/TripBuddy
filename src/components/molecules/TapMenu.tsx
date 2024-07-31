'use client';

import React, { useEffect, useState } from 'react';
import TapMenuButton from '../atoms/TapMenuButton';
import { useAuth } from '@/hooks/auth';
import { usePathname } from 'next/navigation';

const TapMenu: React.FC = () => {
    const { buddy } = useAuth();
    const buddy_id = buddy ? buddy.buddy_id : '';

    const [isChattingPage, setIsChattingPage] = useState<boolean>(false);

    const pathname = usePathname();

    useEffect(() => {
        setIsChattingPage(pathname.startsWith('/chat/'));
    }, [pathname]);

    return (
        <div
            className={` ${
                isChattingPage ? 'hidden' : ''
            } fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[375px] bg-white border-t-2 border-gray-200 grid grid-cols-4 xl:hidden`} // 변경 필요
        >
            <TapMenuButton iconName="Home" href="/" />
            <TapMenuButton iconName="Trip" href="/" />
            <TapMenuButton iconName="Chat" href="/chat" />
            <TapMenuButton
                iconName="Mypage"
                href={buddy_id ? `/profile/${buddy_id}` : '/login'}
            />
        </div>
    );
};

export default TapMenu;
