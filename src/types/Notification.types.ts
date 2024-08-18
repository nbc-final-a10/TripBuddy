import { Tables } from './supabase';

export type PartialNotification = Partial<Notification>;

export type NotificationContextType = {
    notifications: ClassifiedNotification | [];
    hasNotification: boolean;
};

export type ClassifiedNotification = {
    storyLikes: Notification[];
    follows: Notification[];
    bookmarks: Notification[];
    contracts: Notification[];
    [key: string]: Notification[];
};

export type Notification = Tables<'notifications'>;
