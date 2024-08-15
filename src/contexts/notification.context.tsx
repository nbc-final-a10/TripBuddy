'use client';

import { useAuth } from '@/hooks';
import { useNotificationQuery } from '@/hooks/queries';
import {
    Notification,
    NotificationContextType,
} from '@/types/Notification.types';
import supabase from '@/utils/supabase/client';
import { showAlert } from '@/utils/ui/openCustomAlert';
import {
    RealtimePostgresDeletePayload,
    RealtimePostgresInsertPayload,
} from '@supabase/supabase-js';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';

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
    const {
        data: notificationsFromQuery,
        isPending,
        error,
    } = useNotificationQuery();
    const [notifications, setNotifications] = useState<Notification[]>(
        initialNotifications || [],
    );
    const { buddy } = useAuth();

    console.log('notifications 프로바이더에서 ====>', notifications);

    useEffect(() => {
        if (notificationsFromQuery) {
            setNotifications(notificationsFromQuery);
        }
    }, [notificationsFromQuery]);

    useEffect(() => {
        if (isPending) return;
        const handleRealTimePostsUpdate = (
            payload: RealtimePostgresInsertPayload<Notification>,
        ) => {
            setNotifications(prev => [...prev, payload.new]);
        };
        const handleRealTimePostsDelete = (
            payload: RealtimePostgresDeletePayload<Notification>,
        ) => {
            setNotifications(prev =>
                prev.filter(
                    item =>
                        item.notification_id !== payload.old.notification_id,
                ),
            );
        };
        const allChanges = supabase
            .channel('realtime-posts')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'notification',
                    filter: `notification.notification_receiver=${buddy?.buddy_id}`,
                },
                handleRealTimePostsUpdate,
            )
            .on(
                'postgres_changes',
                {
                    event: 'DELETE',
                    schema: 'public',
                    table: 'notification',
                    filter: `notification.notification_receiver=${buddy?.buddy_id}`,
                },
                handleRealTimePostsDelete,
            )
            .subscribe();

        return () => {
            supabase.removeChannel(allChanges);
        };
    }, [buddy, isPending]);

    useEffect(() => {
        if (error) {
            showAlert('error', error.message);
        }
    }, [error]);

    return (
        <NotificationContext.Provider value={{ notifications }}>
            {children}
        </NotificationContext.Provider>
    );
};
