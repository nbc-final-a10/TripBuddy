'use client';

import { useAuth } from '@/hooks/auth';
import Link from 'next/link';
import React from 'react';
import MyPageIcon from '../../../../public/svg/mypageicon.svg';

const HeaderMyPageLink: React.FC = () => {
    const { buddy, logOut } = useAuth();
    const buddy_id = buddy ? buddy.buddy_id : '';

    return (
        <div className="flex gap-12 items-center font-bold">
            {buddy_id ? (
                <button onClick={logOut}>LOGOUT</button>
            ) : (
                <Link href="/login">LOGIN</Link>
            )}
            {!buddy_id && <Link href="/signup">JOIN</Link>}
            <Link href={buddy_id ? `/profile/${buddy_id}` : '/login'}>
                <MyPageIcon />
            </Link>
        </div>
    );
};

export default HeaderMyPageLink;
