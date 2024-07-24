const ChatListItem = () => {
    return (
        <div className="flex justify-between">
            <div className="w-[45px] bg-gray-100 flex items-center justify-center">
                사진
            </div>
            <div className="flex flex-col gap-1 justify-center">
                <p className="text-sm font-bold">
                    부산 여행 카페투어 같이 해요!
                </p>
                <p className="text-xs">
                    네 좋습니다 그때 거기서 뵙는 거로 하죠!
                </p>
            </div>
            <div className="text-xs flex flex-col gap-1">
                <span>14:23</span>
                <span className="rounded-[16px] flex items-center justify-center bg-gray-300 p-1">
                    +3
                </span>
            </div>
        </div>
    );
};

export default ChatListItem;
