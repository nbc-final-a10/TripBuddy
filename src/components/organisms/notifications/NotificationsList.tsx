'use client';
import Image from 'next/image';
import { Notification } from '@/types/Notification.types';
import { useState } from 'react';
import NotificationListItem from '@/components/molecules/notifications/NotificationListItem';

const NotificationsList = () => {
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            notification_content: '부산 여행 채팅방에 새로운 채팅이 있어요',
            notification_created_at: '2024-08-08T12:00:00Z',
            notification_id: '1',
            notification_isRead: false,
            notification_receiver: '강아진',
            notification_sender: '김민아',
            notification_type: 'message',
        },
        {
            notification_content: '도쿄 여행 채팅방에 새로운 채팅이 있어요',
            notification_created_at: '2024-08-07T12:00:00Z',
            notification_id: '2',
            notification_isRead: false,
            notification_receiver: '강아진',
            notification_sender: '김민아',
            notification_type: 'message',
        },
        {
            notification_content: '대구 여행 채팅방에 새로운 채팅이 있어요',
            notification_created_at: '2024-07-28T12:00:00Z',
            notification_id: '3',
            notification_isRead: false,
            notification_receiver: '강아진',
            notification_sender: '김민아',
            notification_type: 'message',
        },
    ]);
    return (
        <ul>
            {notifications.map(notification => (
                <NotificationListItem
                    key={notification.notification_id}
                    notification={notification}
                />
            ))}
        </ul>
    );
};

export default NotificationsList;
