import Link from 'next/link';
import React from 'react';

type ChatListItemProps = {
    chatId: string;
    chatName: string;
    lastMessage: string;
};

const ChatListItem: React.FC<ChatListItemProps> = ({
    chatId,
    chatName,
    lastMessage,
}) => {
    return (
        <Link href={`/chat/${chatId}`}>
            <div className="flex justify-between">
                <div className="w-[45px] bg-gray-100 flex items-center justify-center">
                    사진
                </div>
                <div className="flex flex-col gap-1 justify-center">
                    <p className="text-sm font-bold">{chatName}</p>
                    <p className="text-xs">{lastMessage}</p>
                </div>
                <div className="text-xs flex flex-col gap-1">
                    <span>14:23</span>
                    <span className="rounded-[16px] flex items-center justify-center bg-gray-300 p-1">
                        +3
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default ChatListItem;
