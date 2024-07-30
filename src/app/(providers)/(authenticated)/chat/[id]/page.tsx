'use client';
import ChatMessageList from '@/components/molecules/chatpage/ChatMessageList';
import ChatMessageSend from '@/components/molecules/chatpage/ChatMessageSend';
import ChattingTitle from '@/components/molecules/chatpage/ChattingTitle';
import { useAuth } from '@/hooks/auth';
import { useParams } from 'next/navigation';

const ChattingPage = () => {
    const { buddy: currentBuddy } = useAuth();
    const params = useParams();
    const { id } = params as { id: string };

    return (
        <div className="bg-white">
            <ChattingTitle />
            <ChatMessageList currentBuddy={currentBuddy} id={id} />
            <ChatMessageSend currentBuddy={currentBuddy} id={id} />
        </div>
    );
};

export default ChattingPage;