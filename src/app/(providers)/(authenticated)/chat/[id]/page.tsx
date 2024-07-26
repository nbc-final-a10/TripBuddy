'use client';
import ChatMessage from '@/components/molecules/chatpage/ChatMessage';
import { useParams } from 'next/navigation';

const ChattingPage = () => {
    const params = useParams();
    const { id } = params;
    return (
        <div className="bg-white">
            <div>채팅번호: {id}</div>
            <ChatMessage />
        </div>
    );
};

export default ChattingPage;
