import ChatListItem from '@/components/molecules/chatpage/ChatListItem';
import React from 'react';

const chatData = [
    {
        contractTripId: '8a9313c8-0c0a-4ba4-804d-b0e101f39d9b',
        chatName: '부산 여행 카페투어 같이 해요!',
        lastMessage: '네 좋습니다 그때 거기서 뵙는 거로 하죠!',
    },
    {
        contractTripId: 'c8d9a501-5d13-4fb5-9e01-86cf98905d28',
        chatName: '부산 여행 카페투어 같이 해요!',
        lastMessage: '네 좋습니다 그때 거기서 뵙는 거로 하죠!',
    },
];

const ChatList: React.FC = () => {
    return (
        <div className="flex flex-col gap-5 p-4">
            {chatData.map(chat => (
                <ChatListItem
                    key={chat.contractTripId}
                    contractTripId={chat.contractTripId}
                    chatName={chat.chatName}
                    lastMessage={chat.lastMessage}
                />
            ))}
        </div>
    );
};

export default ChatList;
