'use client';
import React, { useState, useEffect } from 'react';
import { Message } from '@/types/Chat.types';
import supabase from '@/utils/supabase/client';
import Image from 'next/image';

type ChatMessageListProps = {
    currentBuddy: any;
    id: string;
};

const ChatMessageList: React.FC<ChatMessageListProps> = ({
    currentBuddy,
    id,
}) => {
    const [messages, setMessages] = useState<
        (Message & {
            buddy: { buddy_profile_pic: string; buddy_nickname: string };
        })[]
    >([]);

    useEffect(() => {
        const channel = supabase
            .channel('chat-room')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'messages' },
                payload => {
                    const newMessage = payload.new as Message & {
                        buddy: {
                            buddy_profile_pic: string;
                            buddy_nickname: string;
                        };
                    };
                    if (newMessage.message_trip_id === id) {
                        setMessages(prevMessages => [
                            ...prevMessages,
                            newMessage,
                        ]);
                    }
                },
            )
            .subscribe();

        return () => {
            channel.unsubscribe();
        };
    }, [id]);

    useEffect(() => {
        const fetchMessages = async () => {
            const { data, error } = await supabase
                .from('messages')
                .select(
                    `
                    *,
                    buddy:message_sender_id (
                        buddy_profile_pic,
                        buddy_nickname
                    )
                `,
                )
                .eq('message_trip_id', id)
                .order('message_created_at', { ascending: true });

            if (error) {
                console.error('Error fetching messages:', error);
            } else {
                setMessages(data);
            }
        };

        fetchMessages();
    });

    return (
        <div className="px-6">
            {messages.map(message => {
                const isCurrentUser =
                    message.message_sender_id === currentBuddy?.buddy_id;

                return (
                    <div
                        key={message.message_id}
                        className={`py-2 flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                    >
                        {!isCurrentUser && (
                            <div className="w-[40px] h-[40px] text-xs rounded-full">
                                <Image
                                    src={message.buddy?.buddy_profile_pic}
                                    alt="Profile Image"
                                    width={40}
                                    height={40}
                                    className="rounded-full"
                                />
                            </div>
                        )}
                        <div className="p-2 pt-4 flex flex-col">
                            {!isCurrentUser && (
                                <p className="text-xs font-bold">
                                    {message.buddy?.buddy_nickname}
                                </p>
                            )}
                            <p
                                className={`inline-block text-xs p-4 rounded-2xl ${
                                    isCurrentUser
                                        ? 'bg-main-color text-black rounded-tr-none'
                                        : 'bg-gray-200 text-black rounded-tl-none'
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
                    </div>
                );
            })}
        </div>
    );
};

export default ChatMessageList;
