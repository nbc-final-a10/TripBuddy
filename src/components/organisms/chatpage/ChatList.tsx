import ChatListItem from '@/components/molecules/chatpage/ChatListItem';
import React from 'react';

const chatData = [
    {
        chatId: '1',
        chatName: '부산 여행 카페투어 같이 해요!',
        lastMessage: '네 좋습니다 그때 거기서 뵙는 거로 하죠!',
    },
    {
        chatId: '2',
        chatName: '부산 여행 카페투어 같이 해요!',
        lastMessage: '네 좋습니다 그때 거기서 뵙는 거로 하죠!',
    },
    {
        chatId: '3',
        chatName: '부산 여행 카페투어 같이 해요!',
        lastMessage: '네 좋습니다 그때 거기서 뵙는 거로 하죠!',
    },
];

const ChatList: React.FC = () => {
    return (
        <div className="flex flex-col gap-5 p-4">
            {chatData.map(chat => (
                <ChatListItem
                    key={chat.chatId}
                    chatId={chat.chatId}
                    chatName={chat.chatName}
                    lastMessage={chat.lastMessage}
                />
            ))}
        </div>
    );
};

export default ChatList;
