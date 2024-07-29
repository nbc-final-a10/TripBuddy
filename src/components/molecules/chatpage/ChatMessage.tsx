'use client';

import supabase from '@/utils/supabase/client';
import MessageInput from '@/components/atoms/chatpage/MessageInput';
import { Message } from '@/types/Chat.types';
import { useAuth } from '@/hooks/auth';
import ChatMessageList from './ChatMessageList';
import React from 'react';

const ChatMessage: React.FC = () => {
    const { buddy } = useAuth();

    const handleSendMessage = async (messageText: string) => {
        if (!buddy || !buddy.buddy_id) {
            console.error('Buddy is not logged in or buddy_id is missing');
            return;
        }

        const newMessage: Omit<Message, 'message_id'> = {
            message_content: messageText,
            message_sender_id: buddy.buddy_id,
            message_created_at: new Date().toISOString(),
            message_type: 'text',
            message_trip_id: null,
        };

        // Supabase에 메시지 삽입
        const { data, error } = await supabase
            .from('messages')
            .insert([newMessage])
            .select();

        if (error) {
            console.error('Error inserting message:', error);
        } else if (data && data.length > 0) {
        }
    };

    return (
        <>
            <section className="relative">
                <div className="border-y-[1px] border-gray-200 px-6 py-2 mb-4">
                    <div className="flex items-center">
                        <div className="w-[40px] h-[40px] bg-gray-200"></div>
                        <div className="h-[40px] px-3 flex flex-col justify-between">
                            <p className="text-sm font-bold">
                                부산 여행 카페투어 같이 해요!
                            </p>
                            <div className="text-xs flex gap-6">
                                <span>부산</span>
                                <span>7/10 (수)</span>
                                <span>3/4명</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full text-xs flex justify-center">
                    <p className="w-fit bg-gray-200 rounded-[8px] px-[8px] py-[2px] font-bold">
                        2024년 7월 10일
                    </p>
                </div>
                <ChatMessageList />
                <MessageInput onSendMessage={handleSendMessage} />
            </section>
        </>
    );
};

export default ChatMessage;
