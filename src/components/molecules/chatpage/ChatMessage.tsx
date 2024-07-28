import React, { useState } from 'react';
import MessageInput from '@/components/atoms/chatpage/MessageInput';

type Message = {
    id: number;
    text: string;
    user: string;
    timestamp: string;
};

const ChatMessage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: '안녕하세요! 새로 들어오셨군요~',
            user: '프사1',
            timestamp: '20:22',
        },
        { id: 2, text: '와아 반가워요!!', user: '프사2', timestamp: '20:23' },
    ]);

    const currentUser = '프사3';

    const handleSendMessage = (messageText: string) => {
        const newMessage: Message = {
            id: messages.length + 1,
            text: messageText,
            user: currentUser,
            timestamp: new Date().toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
            }),
        };
        setMessages([...messages, newMessage]);
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
                <div className="px-6">
                    {messages.map(message => (
                        <div
                            key={message.id}
                            className={`py-2 flex ${
                                message.user === currentUser
                                    ? 'justify-end'
                                    : 'justify-start'
                            }`}
                        >
                            {message.user !== currentUser && (
                                <div className="w-[40px] h-[40px] bg-gray-200 text-xs rounded-full flex justify-center items-center">
                                    {message.user}
                                </div>
                            )}
                            <div className="p-2 pt-4 flex flex-col">
                                <p
                                    className={`inline-block text-xs bg-gray-200 p-4 rounded-2xl ${
                                        message.user === currentUser
                                            ? 'rounded-tr-none'
                                            : 'rounded-tl-none'
                                    }`}
                                >
                                    {message.text}
                                </p>
                                <span className="text-xs text-gray-500 mt-1">
                                    {message.timestamp}
                                </span>
                            </div>
                            {message.user === currentUser && (
                                <div className="w-[40px] h-[40px] bg-gray-200 text-xs rounded-full flex justify-center items-center">
                                    {message.user}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <MessageInput onSendMessage={handleSendMessage} />
            </section>
        </>
    );
};

export default ChatMessage;
