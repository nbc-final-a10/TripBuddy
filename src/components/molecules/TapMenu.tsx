'use client';

import React from 'react';
import TapMenuButton from '../atoms/TapMenuButton';
import { useAuth } from '@/hooks/auth';

const TapMenu: React.FC = () => {
    const { buddy } = useAuth();
    const buddy_id = buddy ? buddy.buddy_id : '';
    return (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[375px] bg-white border-t-2 border-gray-200 grid grid-cols-4 xl:hidden">
            <TapMenuButton iconName="Home" href="/" />
            <TapMenuButton iconName="Trip" href="/" />
            <TapMenuButton iconName="Chat" href="/chat" />
            <TapMenuButton
                iconName="Mypage"
                href={buddy_id ? `/profile/${buddy_id}` : '/login'}
            />
            {/* 주소 변경 각 페이지 담당자가 해주시면 됩니다 */}
        </div>
    );
};

export default TapMenu;
