import React from 'react';
import TapMenuButton from '../atoms/TapMenuButton';

const TapMenu: React.FC = () => {
    return (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[375px] bg-white border-t-2 border-gray-200 grid grid-cols-4">
            <TapMenuButton iconName="Home" href="/" />
            <TapMenuButton iconName="Trip" href="/" />
            <TapMenuButton iconName="Chat" href="/chat" />
            <TapMenuButton iconName="Mypage" href="/" />
            {/* 주소 변경 각 페이지 담당자가 해주시면 됩니다 */}
        </div>
    );
};

export default TapMenu;
