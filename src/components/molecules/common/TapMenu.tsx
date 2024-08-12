'use client';

import React from 'react';
import TapMenuButton from '@/components/atoms/common/TapMenuButton';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '@/hooks';

const TapMenu: React.FC = () => {
    const { buddy } = useAuth();
    const pathname = usePathname();
    const buddy_id = buddy ? buddy.buddy_id : '';

    const hidden =
        pathname.startsWith('/chat/') ||
        pathname === '/login' ||
        pathname === '/signup' ||
        pathname === '/recover' ||
        pathname === '/tutorial';

    // 아래 svg 들 svgr 로 추후 수정 요망
    return (
        <div
            className={twMerge(
                'z-[99] fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[430px] min-w-[375px] bg-white border-t-2 border-gray-200 grid grid-cols-4 xl:hidden',
                hidden && 'hidden',
            )} // 변경 필요
        >
            <TapMenuButton iconName="Home" href="/" title="홈" />
            <TapMenuButton iconName="Trip" href="/trips" title="여정" />
            <TapMenuButton
                iconName="Chat"
                href={buddy_id ? `/chat` : '/login'}
                title="채팅"
            />
            <TapMenuButton
                iconName="MyPage"
                href={buddy_id ? `/profile/${buddy_id}` : '/login'}
                title="마이페이지"
            />
        </div>
    );
};

export default TapMenu;
