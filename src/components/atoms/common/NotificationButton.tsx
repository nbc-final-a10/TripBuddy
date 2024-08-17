'use client';
import React, { useContext } from 'react';
import Alarm from '../../../../public/svg/Alarm.svg';
import { NotificationContext } from '@/contexts/notification.context';

const NotificationButton = () => {
    const { hasNotification } = useContext(NotificationContext);

    return (
        <div className="relative">
            <Alarm />
            {hasNotification && (
                <div className="bg-[#E12B56] w-[8px] h-[8px] rounded-full absolute right-0 top-[-2px] box-content border-2 border-white"></div>
            )}
        </div>
    );
};

export default NotificationButton;
