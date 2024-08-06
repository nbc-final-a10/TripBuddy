'use client';
import React, { useState, useEffect, MutableRefObject, useRef } from 'react';
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
    const scrollRef = useRef() as MutableRefObject<HTMLDivElement>;
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
                async payload => {
                    const newMessage = payload.new as Message;

                    const { data: buddyData, error: senderError } =
                        await supabase
                            .from('buddies')
                            .select('buddy_profile_pic, buddy_nickname')
                            .eq('buddy_id', newMessage.message_sender_id)
                            .single();

                    if (senderError) {
                        console.error(
                            'Error fetching sender info:',
                            senderError,
                        );
                        return;
                    }

                    const newMessageWithBuddy = {
                        ...newMessage,
                        buddy: buddyData,
                    };

                    if (newMessage.message_trip_id === id) {
                        setMessages(prevMessages => [
                            ...prevMessages,
                            newMessageWithBuddy,
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
    }, [id]);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (scrollContainer) {
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
    }, [messages]);

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return new Date(dateString).toLocaleDateString('ko-KR', options);
    };

    return (
        <div
            className="px-6 pb-12 h-[calc(100vh-150px)] overflow-y-auto scrollbar-hidden"
            ref={scrollRef}
        >
            {messages.map((message, index) => {
                const isCurrentUser =
                    message.message_sender_id === currentBuddy?.buddy_id;

                const currentMessageDate = new Date(message.message_created_at);
                const previousMessageDate =
                    index > 0
                        ? new Date(messages[index - 1].message_created_at)
                        : null;

                const showDate =
                    !previousMessageDate ||
                    currentMessageDate.toDateString() !==
                        previousMessageDate.toDateString();

                return (
                    <div key={message.message_id}>
                        {showDate && (
                            <div className="w-full text-[12px] flex justify-center my-2">
                                <p className="w-fit bg-[#516FE6] text-white rounded-[4px] px-[8px] py-[2px]">
                                    {formatDate(message.message_created_at)}
                                </p>
                            </div>
                        )}
                        <div
                            className={`py-2 flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                        >
                            {!isCurrentUser && (
                                <div className="w-[40px] h-[40px] text-xs rounded-full overflow-hidden flex justify-center items-center">
                                    <Image
                                        src={message.buddy?.buddy_profile_pic}
                                        alt="Profile Image"
                                        width={40}
                                        height={40}
                                        className="rounded-full object-cover"
                                    />
                                </div>
                            )}
                            <div
                                className={`p-2 pt-4 items-end flex ${isCurrentUser ? 'flex-row-reverse' : ''}`}
                            >
                                <div>
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
                                </div>

                                <span className="text-xs text-gray-500 mt-1 px-1">
                                    {new Date(
                                        message.message_created_at,
                                    ).toLocaleTimeString('en-GB', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ChatMessageList;
