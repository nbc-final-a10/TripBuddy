import Link from 'next/link';
import React from 'react';

type ChatListItemProps = {
    contractTripId: string;
    chatName: string;
    lastMessage: string;
};

const ChatListItem: React.FC<ChatListItemProps> = ({
    contractTripId,
    chatName,
    lastMessage,
}) => {
    return (
        <Link href={`/chat/${contractTripId}`}>
            <div className="flex justify-between items-center">
                <div className="flex space-x-1">
                    <div className="w-[30px] h-[30px] bg-gray-100 rounded-full overflow-hidden"></div>
                </div>
                <div className="flex flex-col gap-1 justify-center flex-grow pl-2">
                    <p className="text-sm font-bold">{chatName}</p>
                    <p className="text-xs">{lastMessage}</p>
                </div>
                <div className="text-xs flex flex-col gap-1">
                    <span>19:02</span>
                    <span className="rounded-[16px] flex items-center justify-center bg-gray-300 p-1">
                        +3
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default ChatListItem;
