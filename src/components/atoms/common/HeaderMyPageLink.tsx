'use client';

import { useAuth } from '@/hooks/auth';
import Link from 'next/link';
import React from 'react';
import MyPageIcon from '../../../../public/svg/mypageicon.svg';

const HeaderMyPageLink: React.FC = () => {
    const { buddy } = useAuth();
    const buddy_id = buddy ? buddy.buddy_id : '';

    return (
        <Link href={buddy_id ? `/profile/${buddy_id}` : '/login'}>
            <MyPageIcon />
        </Link>
    );
};

export default HeaderMyPageLink;
