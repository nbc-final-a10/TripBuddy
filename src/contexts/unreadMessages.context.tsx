'use client';
import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
} from 'react';
import supabase from '@/utils/supabase/client';
import useChatStore from '@/zustand/chat.store';
import { useAuth } from '@/hooks';

type UnreadCount = {
    contract_trip_id: string;
    unread_count: number;
};

type UnreadMessagesContextType = {
    totalUnreadCount: number;
    fetchUnreadCounts: () => void;
};

const UnreadMessagesContext = createContext<
    UnreadMessagesContextType | undefined
>(undefined);

export const UnreadMessagesProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const { buddy: currentBuddy } = useAuth();
    const { setUnreadCount } = useChatStore();
    const [totalUnreadCount, setTotalUnreadCount] = useState<number>(0);

    const fetchUnreadCounts = useCallback(async () => {
        if (!currentBuddy?.buddy_id) return;

        try {
            const { data, error } = await supabase.rpc('get_unread_counts', {
                current_buddy_id: currentBuddy?.buddy_id,
            });

            if (error) {
                console.error('Error fetching unread counts:', error);
                return;
            }

            const unreadCounts: UnreadCount[] = data || [];
            let total = 0;
            unreadCounts.forEach(({ contract_trip_id, unread_count }) => {
                setUnreadCount(contract_trip_id, unread_count);
                total += unread_count;
            });

            setTotalUnreadCount(total);
        } catch (error) {
            console.error('Error fetching unread counts:', error);
        }
    }, [currentBuddy, setUnreadCount]);

    useEffect(() => {
        if (!currentBuddy?.buddy_id) return;

        fetchUnreadCounts();

        const readUpdateSubscription = supabase
            .channel('chat-room')
            .on(
                'postgres_changes',
                { event: 'UPDATE', schema: 'public', table: 'contract' },
                async () => {
                    await fetchUnreadCounts();
                },
            )
            .subscribe();

        return () => {
            readUpdateSubscription.unsubscribe();
        };
    }, [fetchUnreadCounts, currentBuddy]);

    return (
        <UnreadMessagesContext.Provider
            value={{ totalUnreadCount, fetchUnreadCounts }}
        >
            {children}
        </UnreadMessagesContext.Provider>
    );
};

export const useUnreadMessagesContext = () => {
    const context = useContext(UnreadMessagesContext);
    if (context === undefined) {
        throw new Error(
            'useUnreadMessagesContext must be used within an UnreadMessagesProvider',
        );
    }
    return context;
};
