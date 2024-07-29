'use client';

import React, { useState, useEffect } from 'react';
import supabase from '@/utils/supabase/client';
import { Message } from '@/types/Chat.types';
import { useAuth } from '@/hooks/auth';

const ChatMessageList: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const { buddy } = useAuth();

    useEffect(() => {
        const fetchMessages = async () => {
            const { data, error } = await supabase
                .from('messages')
                .select('*, buddies(*)')
                .order('message_created_at', { ascending: true });

            if (error) {
                console.error('Error fetching messages:', error);
            } else {
                setMessages(data);
                console.log(data);
            }
        };

        fetchMessages();
    }, []);

    return (
        <div className="px-6">
            {messages.map(message => (
                <div
                    key={message.message_id}
                    className={`py-2 flex ${
                        message.message_sender_id === buddy?.buddy_id
                            ? 'justify-end'
                            : 'justify-start'
                    }`}
                >
                    {message.message_sender_id !== buddy?.buddy_id && (
                        <div className="w-[40px] h-[40px] bg-gray-200 text-xs rounded-full flex justify-center items-center">
                            {message.message_sender_id}
                        </div>
                    )}
                    <div className="p-2 pt-4 flex flex-col">
                        <p
                            className={`inline-block text-xs bg-gray-200 p-4 rounded-2xl ${
                                message.message_sender_id === buddy?.buddy_id
                                    ? 'rounded-tr-none'
                                    : 'rounded-tl-none'
                            }`}
                        >
                            {message.message_content}
                        </p>
                        <span className="text-xs text-gray-500 mt-1">
                            {new Date(
                                message.message_created_at,
                            ).toLocaleTimeString('en-GB', {
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </span>
                    </div>
                    {message.message_sender_id === buddy?.buddy_id && (
                        <div className="w-[40px] h-[40px] bg-gray-200 text-xs rounded-full flex justify-center items-center">
                            {message.message_sender_id}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ChatMessageList;
