'use client';
import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import supabase from '@/utils/supabase/client';
import Image from 'next/image';
import { Message } from '@/types/Chat.types';

type ChatMessageSendProps = {
    id: string;
    currentBuddy: any;
};

const ChatMessageSend: React.FC<ChatMessageSendProps> = ({
    currentBuddy,
    id,
}) => {
    const [inputText, setInputText] = useState('');

    const handleSendMessage = async (messageText: string) => {
        if (!currentBuddy || !currentBuddy.buddy_id) {
            console.error('Buddy is not logged in or buddy_id is missing');
            return;
        }

        const newMessage: Omit<Message, 'message_id'> = {
            message_content: messageText,
            message_sender_id: currentBuddy.buddy_id,
            message_created_at: new Date().toISOString(),
            message_type: 'text',
            message_trip_id: id,
        };

        const { data, error } = await supabase
            .from('messages')
            .insert([newMessage])
            .select();

        if (error) {
            console.error('Error inserting message:', error);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    };

    const handleSend = () => {
        if (inputText.trim()) {
            handleSendMessage(inputText);
            setInputText('');
        }
    };

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[430px] min-w-[375px] bg-white border-gray-200 flex justify-center items-center p-2">
            {/* 이미지 첨부 버튼 MVP 이후 추가 예정 */}
            {/* <button className="w-[28px] h-[28px] flex items-center justify-center">
                <Image src="/svg/Plus.svg" alt="Plus" width="20" height="20" />
            </button> */}
            <input
                type="text"
                placeholder="메시지 작성 ..."
                value={inputText}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                className="text-[14] font-medium text-grayscale-color-500 outline-none w-[80%] h-[37px] bg-grayscale-color-70 rounded-[8px] p-[8px]"
            />
            <button
                className="w-[28px] h-[28px] flex items-center justify-center"
                onClick={handleSend}
            >
                <Image src="/svg/Send.svg" alt="Send" width="20" height="20" />
            </button>
        </div>
    );
};

export default ChatMessageSend;
