import Image from 'next/image';
import React from 'react';
import { getTimeSinceUpload } from '@/utils/common/getTimeSinceUpload';
import { Notification } from '@/types/Notification.types';
import Link from 'next/link';

interface NotificationListItemProps {
    notification: Notification;
}

const NotificationListItem: React.FC<NotificationListItemProps> = ({
    notification,
}) => {
    const timeSinceUpload = getTimeSinceUpload(
        notification.notification_created_at,
    );

    const getNotificationUrl = (notification: Notification) => {
        switch (notification.notification_type) {
            case 'follow':
                return `/profile/${notification.notification_origin_id}`;
            case 'bookmark':
            case 'contract':
                return `/trips/${notification.notification_origin_id}`;
            case 'like':
                return `/stories/${notification.notification_origin_id}`;
            default:
                return '/notifications';
        }
    };

    const url = getNotificationUrl(notification);

    return (
        <li>
            <Link href={url} className="flex px-[20px] py-[12px] gap-[10px]">
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
            </Link>
        </li>
    );
};

export default NotificationListItem;
