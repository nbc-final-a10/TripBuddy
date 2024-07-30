const ChattingTitle = () => {
    return (
        <section className="relative">
            <div className="border-y-[1px] border-gray-200 px-6 py-2 mb-4">
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
            <div className="w-full text-[12px] flex justify-center">
                <p className="w-fit bg-[#516FE6] text-white rounded-[4px] px-[8px] py-[2px]">
                    2024년 7월 10일
                </p>
            </div>
        </section>
    );
};

export default ChattingTitle;