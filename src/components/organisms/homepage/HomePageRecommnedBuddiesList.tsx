import MascotImage from '@/components/atoms/common/O_MascotImage';
import BuddyTemperature from '@/components/atoms/profile/BuddyTemperature';
import useTapScroll from '@/hooks/useTapScroll';
import React, { useState, useEffect, useRef } from 'react';

function HomePageRecommnedBuddiesList() {
    const buddiesRef = useRef<HTMLDivElement>(null);
    const { createMouseDownHandler } = useTapScroll();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="container">
            {loading ? (
                <div className="box">
                    <div className="skeleton">
                        <div className="skeleton-left flex1">
                            <div className="square"></div>
                        </div>
                        <div className="skeleton-right flex2">
                            <div className="line h17 w40 m10"></div>
                            <div className="line"></div>
                            <div className="line h8 w50"></div>
                            <div className="line w75"></div>
                        </div>
                    </div>
                </div>
            ) : (
                // 로딩완료 이후
                <div>
                    {/* Todo: PC에서는 스크롤바 보이게 하기 */}
                    <div
                        className="flex overflow-x-auto scrollbar-hide xl:scrollbar-default"
                        onMouseDown={createMouseDownHandler(buddiesRef)}
                    >
                        {Array.from({ length: 10 }).map((_, index) => (
                            <div
                                key={index}
                                className="min-w-[200px] h-[75px] mx-1 rounded border border-gray-200 shadow-md"
                            >
                                <div className="flex items-center w-[120px] h-full">
                                    <div className="flex-shrink-0 w-[75px] h-[75px]">
                                        <MascotImage intent="happy" />
                                    </div>
                                    <div className="ml-2 flex flex-col">
                                        <span className="text-xs font-bold text-gray-500 whitespace-nowrap">
                                            #감성 #즉흥적
                                        </span>
                                        <div className="text-m font-bold whitespace-nowrap">
                                            <span>장원영</span>
                                            <span> / </span>
                                            <span>34세</span>
                                        </div>
                                        <div>
                                            <BuddyTemperature
                                                isLabel={false}
                                                isTempText={false}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
export default HomePageRecommnedBuddiesList;
