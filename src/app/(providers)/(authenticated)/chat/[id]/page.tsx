'use client';
import ChatMessageList from '@/components/molecules/chatpage/ChatMessageList';
import ChatMessageSend from '@/components/molecules/chatpage/ChatMessageSend';
import ChattingTitle from '@/components/molecules/chatpage/ChattingTitle';
import { useAuth } from '@/hooks/auth';
import { useParams } from 'next/navigation';

const ChattingPage = () => {
    const { buddy: currentBuddy } = useAuth();
    const params = useParams();
    const { id } = params;

    return (
        <div className="bg-white">
            <div>채팅번호: {id}</div>
            <ChattingTitle />
            <ChatMessageList currentBuddy={currentBuddy} />
            <ChatMessageSend currentBuddy={currentBuddy} />
        </div>
    );
};

export default ChattingPage;
