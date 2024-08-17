'use client';
import { useContext, useState } from 'react';
import NotificationListItem from '@/components/molecules/notifications/NotificationListItem';
import { NotificationContext } from '@/contexts/notification.context';
import { ClassifiedNotification } from '@/types/Notification.types';

const NotificationsList = () => {
    const { notifications } = useContext(NotificationContext) as {
        notifications: ClassifiedNotification;
    };

    const allNotifications = [
        ...notifications.storyLikes,
        ...notifications.follows,
        ...notifications.bookmarks,
        ...notifications.contracts,
    ];

    const unreadNotifications = allNotifications.filter(
        notification => !notification.notification_isRead,
    );

    unreadNotifications.sort(
        (a, b) =>
            new Date(b.notification_created_at).getTime() -
            new Date(a.notification_created_at).getTime(),
    );

    return (
        <ul>
            {unreadNotifications.map(notification => (
                <NotificationListItem
                    key={notification.notification_id}
                    notification={notification}
                />
            ))}
        </ul>
    );
};

export default NotificationsList;
