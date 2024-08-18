'use client';
import React from 'react';
import Alarm from '../../../../public/svg/Alarm.svg';
import Link from 'next/link';
import { useNotification } from '@/hooks/notification/useNotification';

const NotificationButton = () => {
    const { hasNotification } = useNotification();

    return (
        <Link href="/notifications" className="relative cursor-pointer">
            <Alarm />
            {hasNotification && (
                <div className="bg-[#E12B56] w-[8px] h-[8px] rounded-full absolute right-0 top-0 box-content border-2 border-white"></div>
            )}
        </Link>
    );
};

export default NotificationButton;
