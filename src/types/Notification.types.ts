import { Tables } from './supabase';
export type Notification = Tables<'notifications'>;

export type NotificationContextType = {
    notifications: Notification[];
};
