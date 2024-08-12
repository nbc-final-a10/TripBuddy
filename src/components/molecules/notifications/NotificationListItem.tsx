import Image from 'next/image';
import { Notification } from '@/types/Notification.types';
import React from 'react';
import { getTimeSinceUpload } from '@/utils/common/getTimeSinceUpload';

interface NotificationListItemProps {
    notification: Notification;
}

const NotificationListItem: React.FC<NotificationListItemProps> = ({
    notification,
}) => {
    const timeSinceUpload = getTimeSinceUpload(
        notification.notification_created_at,
    );

    return (
        <li className="flex px-[20px] py-[12px] gap-[10px]">
            <div>
                <Image
                    src={'/images/mascot_main.webp'}
                    alt={'mascot_main'}
                    width={45}
                    height={45}
                />
            </div>
            <div>
                <p className="text-[16px] font-bold text-grayscale-color-800">
                    {notification.notification_content}
                </p>
                <p className="text-[14px] font-medium text-grayscale-color-500">
                    {timeSinceUpload}
                </p>
            </div>
        </li>
    );
};

export default NotificationListItem;
