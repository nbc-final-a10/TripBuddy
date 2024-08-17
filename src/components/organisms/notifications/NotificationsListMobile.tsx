'use client';
import { useContext } from 'react';
import NotificationListItem from '@/components/molecules/notifications/NotificationListItem';
import { NotificationContext } from '@/contexts/notification.context';
import { ClassifiedNotification } from '@/types/Notification.types';

const NotificationsListMobile = () => {
    const { notifications } = useContext(NotificationContext) as {
        notifications: ClassifiedNotification;
    };

    const allNotifications = [
        ...notifications.storyLikes,
        ...notifications.follows,
        ...notifications.bookmarks,
        ...notifications.contracts,
    ];

    allNotifications.sort(
        (a, b) =>
            new Date(b.notification_created_at).getTime() -
            new Date(a.notification_created_at).getTime(),
    );

    return (
        <ul className="flex flex-col xl:gap-[10px]">
            {allNotifications.map(notification => (
                <NotificationListItem
                    key={notification.notification_id}
                    notification={notification}
                />
            ))}
        </ul>
    );
};

export default NotificationsListMobile;
