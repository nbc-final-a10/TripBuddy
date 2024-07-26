import MessageInput from '@/components/atoms/chatpage/MessageInput';

const ChatMessage = () => {
    return (
        <>
            <section className="relative">
                <div className="border-y-[1px] border-gray-200 px-6 py-2">
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
                <div className="px-6">
                    <div className="py-2 flex">
                        <div className="w-[40px] h-[40px] bg-gray-200 text-xs rounded-full flex justify-center items-center">
                            프사1
                        </div>
                        <div className="p-2 pt-4">
                            <p className="inline-block text-xs bg-gray-200 p-4 rounded-2xl rounded-tl-none">
                                안녕하세요! 새로 들어오셨군요~
                            </p>
                        </div>
                    </div>
                    <div className="py-2 flex">
                        <div className="w-[40px] h-[40px] bg-gray-200 text-xs rounded-full flex justify-center items-center">
                            프사2
                        </div>
                        <div className="p-2 pt-4">
                            <p className="inline-block text-xs bg-gray-200 p-4 rounded-2xl rounded-tl-none">
                                와아 반가워요!!
                            </p>
                        </div>
                    </div>
                </div>
                <MessageInput />
            </section>
        </>
    );
};

export default ChatMessage;
