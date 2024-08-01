'use client';

import React from 'react';
import { useAuth } from '@/hooks/auth';
import clsx from 'clsx';
import TapMenuButton from '@/components/atoms/TapMenuButton';

type TapMenuProps = {
    pathname: string;
};

const TapMenu: React.FC<TapMenuProps> = ({ pathname }) => {
    const { buddy } = useAuth();
    const buddy_id = buddy ? buddy.buddy_id : '';

    // const [isChattingPage, setIsChattingPage] = useState<boolean>(false);

    // useEffect(() => {
    //     const path = window.location.pathname;
    //     setIsChattingPage(path.startsWith('/chat/'));
    // }, []);

    const hidden =
        pathname.startsWith('/chat/') ||
        pathname === '/write/story' ||
        pathname === '/login' ||
        pathname === '/signup' ||
        pathname === '/recover' ||
        pathname === '/tutorial';

    return (
        <div
            className={clsx(
                'z-10 fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[430px] min-w-[375px] bg-white border-t-2 border-gray-200 grid grid-cols-4 xl:hidden',
                hidden && 'hidden',
            )} // 변경 필요
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

// return (
//     <div
//         className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[375px] bg-white border-t-2 border-gray-200 grid grid-cols-4 xl:hidden ${
//             isChattingPage ? 'hidden !important' : ''
//         }`} // 변경 필요
//     >
//         <TapMenuButton iconName="Home" href="/" />
//         <TapMenuButton iconName="Trip" href="/" />
//         <TapMenuButton iconName="Chat" href="/chat" />
//         <TapMenuButton
//             iconName="Mypage"
//             href={buddy_id ? `/profile/${buddy_id}` : '/login'}
//         />
//     </div>
// );