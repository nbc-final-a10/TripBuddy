'use client';
import ChatMessageList from '@/components/molecules/chatpage/ChatMessageList';
import ChatMessageSend from '@/components/molecules/chatpage/ChatMessageSend';
import ChattingTitle from '@/components/molecules/chatpage/ChattingTitle';
import { useAuth } from '@/hooks';
import { Buddy } from '@/types/Auth.types';
import { useParams } from 'next/navigation';

const ChattingPage = () => {
    const { buddy } = useAuth();
    const currentBuddy = buddy as Buddy;
    const params = useParams();
    const { id } = params as { id: string };

    return (
        <div className="xl:w-2/3 bg-white xl:bg-grayscale-color-50 relative">
            <ChattingTitle id={id} />
            <ChatMessageList currentBuddy={currentBuddy} id={id} />
            <ChatMessageSend currentBuddy={currentBuddy} id={id} />
        </div>
    );
};

export default ChattingPage;
