'use client';

import { useAuth } from '@/hooks';
import { useNotificationMutation, useNotificationQuery } from '@/hooks/queries';
import {
    ClassifiedNotification,
    Notification,
    NotificationContextType,
} from '@/types/Notification.types';
import supabase from '@/utils/supabase/client';
import { showAlert } from '@/utils/ui/openCustomAlert';
import {
    RealtimePostgresDeletePayload,
    RealtimePostgresInsertPayload,
} from '@supabase/supabase-js';
import {
    createContext,
    PropsWithChildren,
    useCallback,
    useEffect,
    useState,
} from 'react';

type NotificationProviderProps = {
    initialNotifications: Notification[] | undefined;
};

const initialValue: NotificationContextType = {
    notifications: [],
};

export const NotificationContext =
    createContext<NotificationContextType>(initialValue);

export const NotificationProvider = ({
    children,
    initialNotifications,
}: PropsWithChildren<NotificationProviderProps>) => {
    const [notifications, setNotifications] = useState<ClassifiedNotification>(
        {
            storyLikes:
                initialNotifications?.filter(
                    notification =>
                        notification.notification_type === 'like' &&
                        notification.notification_isRead === false,
                ) || [],
            follows:
                initialNotifications?.filter(
                    notification =>
                        notification.notification_type === 'follow' &&
                        notification.notification_isRead === false,
                ) || [],
        } || [],
    );
    const { buddy } = useAuth();
    const { mutate } = useNotificationMutation();

    const handleRealTimePostsUpdate = useCallback(
        (payload: RealtimePostgresInsertPayload<Notification>) => {
            console.log('payload.new', payload);

            if (payload.new.notification_receiver === buddy?.buddy_id) {
                if (payload.new.notification_type === 'like') {
                    setNotifications(prev => ({
                        ...prev,
                        storyLikes: [...prev.storyLikes, payload.new],
                    }));
                }
                if (payload.new.notification_type === 'follow') {
                    setNotifications(prev => ({
                        ...prev,
                        follows: [...prev.follows, payload.new],
                    }));
                }
            }
        },
        [buddy],
    );

    const handleRealTimePostsDelete = useCallback(
        (payload: RealtimePostgresDeletePayload<Notification>) => {
            console.log('payload.old', payload);

            const notification = notifications.storyLikes.find(
                notification =>
                    notification.notification_id ===
                    payload.old.notification_id,
            );

            const followNotification = notifications.follows.find(
                notification =>
                    notification.notification_id ===
                    payload.old.notification_id,
            );

            if (notification) {
                setNotifications(prev => ({
                    ...prev,
                    storyLikes: prev.storyLikes.filter(
                        item =>
                            item.notification_id !==
                            payload.old.notification_id,
                    ),
                }));
            }
            if (followNotification) {
                setNotifications(prev => ({
                    ...prev,
                    follows: prev.follows.filter(
                        item =>
                            item.notification_id !==
                            payload.old.notification_id,
                    ),
                }));
            }
        },
        [notifications],
    );

    useEffect(() => {
        const allChanges = supabase
            .channel('realtime-posts')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'notifications',
                    filter: `notification_isRead=eq.false`,
                },
                handleRealTimePostsUpdate,
            )
            .on(
                'postgres_changes',
                {
                    event: 'DELETE',
                    schema: 'public',
                    table: 'notifications',
                    filter: `notification_isRead=eq.false`,
                },
                handleRealTimePostsDelete,
            )
            .subscribe();

        return () => {
            supabase.removeChannel(allChanges);
        };
    }, [buddy, handleRealTimePostsDelete, handleRealTimePostsUpdate]);

    useEffect(() => {
        // console.log('notifications 상태 변경 ====>', notifications);
    }, [notifications, mutate]);

    return (
        <NotificationContext.Provider value={{ notifications }}>
            {children}
        </NotificationContext.Provider>
    );
};
