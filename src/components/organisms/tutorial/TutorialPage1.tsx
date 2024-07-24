// src/components/organisms/tutorial/TutorialPage1.tsx
import React from 'react';
import Image from 'next/image';

const TutorialPage1 = () => {
    return (
        <div className="flex flex-col items-center justify-center p-4 h-screen">
            <h2 className="text-lg font-semibold mb-4 text-center">
                궁금한 것만 콕콕 집어서 다양한 콘텐츠로 매일 업데이트
            </h2>
            <div className="content-icons grid grid-cols-2 gap-4">
                <div className="icon flex flex-col items-center">
                    <Image
                        src="/images/newsletter_icon.png"
                        alt="뉴스레터"
                        width={64}
                        height={64}
                    />
                    <p>뉴스레터</p>
                </div>
                <div className="icon flex flex-col items-center">
                    <Image
                        src="/images/video_icon.png"
                        alt="비디오"
                        width={64}
                        height={64}
                    />
                    <p>비디오</p>
                </div>
                <div className="icon flex flex-col items-center">
                    <Image
                        src="/images/cardnews_icon.png"
                        alt="카드뉴스"
                        width={64}
                        height={64}
                    />
                    <p>카드뉴스</p>
                </div>
                <div className="icon flex flex-col items-center">
                    <Image
                        src="/images/chat_icon.png"
                        alt="먼저 Talk"
                        width={64}
                        height={64}
                    />
                    <p>먼저 Talk</p>
                </div>
            </div>
        </div>
    );
};

export default TutorialPage1;
