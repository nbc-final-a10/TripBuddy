import { Tables } from './supabase';
export type Notification = Tables<'notifications'>;

export type PartialNotification = Partial<Notification>;

export type NotificationContextType = {
    notifications: ClassifiedNotification | [];
};

export type ClassifiedNotification = {
    storyLikes: Notification[];
    follows: Notification[];
    bookmarks: Notification[];
    contracts: Notification[];
};
